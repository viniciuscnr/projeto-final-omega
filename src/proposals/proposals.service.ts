import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal } from 'src/entities/proposal.entity';
import { Repository } from 'typeorm';
import { CreateProposalDto } from './dto/createproposal.dto';

@Injectable()
export class ProposalsService {

    constructor(
        @InjectRepository(Proposal)
        private readonly proposalRepository: Repository<Proposal>) {}
    
    findAll() {
        return this.proposalRepository.find();
    }

    createProposal(createProposalDto: CreateProposalDto) {
        let proposal = this.proposalRepository.create(createProposalDto);
        
        proposal.hired = false;
        
        //cálculo do consumo final
        function total() {
            var total:number = 0;
            for (var i = 0; i < proposal.charges.length; i++) {
                total = total + proposal.charges[i].kwhconsumption;
                }
            return total;
        };

        proposal.totalconsumption = Number(total());

        //cálculo do valor total da proposta
        let valorKw = 10;
        switch(proposal.supplytype){
            case "CONVENCIONAL": valorKw += 5;
            break;
            case "RENOVÁVEL": valorKw -= 2;
            break;
        };

        switch(proposal.submarket){
            case "NORTE": valorKw += 2;
            break;
            case "NORDESTE": valorKw -= 1;
            break;
            case "SUL": valorKw += 3.5;
            break;
            case "SUDESTE": valorKw += 1.5;
            break;
        };

        proposal.proposalvalue = (Number(proposal.totalconsumption) * valorKw);

        return this.proposalRepository.save(proposal);
        
    }

    async hireProposal(id: string) {
        let proposal = await this.proposalRepository.findOne(id);
        if(!proposal) {
            throw new NotFoundException(`Proposal of ID ${id} not found`);
        } else {
        proposal.hired=true;
        return proposal;
        }
    }

    async cancelProposal(id: string) {
        const proposal = await this.proposalRepository.findOne(id);
        if (!proposal) {
            throw new NotFoundException(`Proposal of ID ${id} not found`);
        } else {
            return this.proposalRepository.remove(proposal);
        }
    }
}
