import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Decoder } from 'src/decoder/decoder';
import { Proposal } from 'src/entities/proposal.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProposalDto } from './dto/createproposal.dto';

@Injectable()
export class ProposalsService {

    constructor(
        @InjectRepository(Proposal)
        private readonly proposalRepository: Repository<Proposal>,private decoder: Decoder, private usersService: UsersService) {}
    
    async findAll(@Req() req) {
        let userId = await this.decoder.decode(req);
        return this.proposalRepository.find({ where: { user: userId } });
        
    }

    async createProposal(createProposalDto: CreateProposalDto, @Req() req) {
        let proposal = this.proposalRepository.create(createProposalDto);
        
        proposal.hired = false;
        
        //cálculo do consumo total das cargas
        function total() {
            var total:number = 0;
            for (var i = 0; i < proposal.charges.length; i++) {
                total = total + proposal.charges[i].kwhconsumption;
                }
            return total;
        };
        proposal.totalconsumption = Number(total());

        //cálculo do valor do kw de acordo com o tipo de energia e a região
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

        //conexão com o usuário que realizou a proposta
        let user = await this.decoder.returnUser(req);
        proposal.user = user;

        //validação das datas fornecidas e cálculo do tempo da duração do contrato em horas
        let Start = new Date(proposal.initialdate);
        let End = new Date(proposal.finaldate);
        if (End < Start){
            throw new BadRequestException (`A data final deve ser maior que a inicial`)
        } else {
        let duration = (End.valueOf() / 3600000) - (Start.valueOf() / 3600000);
        proposal.proposalvalue = (Number(proposal.totalconsumption) * valorKw * duration);
        if(duration > 26280 && duration <= 35040){proposal.proposalvalue *= 0.95};
        if(duration > 35040 && duration <= 43800){proposal.proposalvalue *= 0.90};
        if(duration > 43800 && duration <= 52560){proposal.proposalvalue *= 0.85};
        if(duration > 52560){proposal.proposalvalue *= 0.80};

        return this.proposalRepository.save(proposal);
        }
    }

    async hireProposal(id: string, @Req() req) {
        let proposal = await this.proposalRepository.findOne(id, { relations: ["user"] });
        let userId = await this.decoder.decode(req);
        console.log(userId);
        console.log(proposal.user.id);
        if (proposal.user.id != userId){throw new BadRequestException(`Proposta de ID ${id} pertence a outro usuário`);}
        if (!proposal) {throw new NotFoundException(`Proposta de ID ${id} não encontrada`);}
        if (proposal.hired == true){throw new BadRequestException(`Proposta de ID ${id} já foi contratada`);}
        proposal.hired = true;
        return this.proposalRepository.save(proposal);
    }
    
    async cancelProposal(id: string, @Req() req) {
        let proposal = await this.proposalRepository.findOne(id, { relations: ["user"] });
        let userId = await this.decoder.decode(req);
        if (proposal.user.id != userId){throw new BadRequestException(`Proposta de ID ${id} pertence a outro usuário`);}
        if (!proposal) {throw new NotFoundException(`Proposta de ID ${id} não encontrada`);}
        if (proposal.hired == true){throw new BadRequestException(`Proposta de ID ${id} já foi contratada`);}
        return this.proposalRepository.remove(proposal);
        }
}
