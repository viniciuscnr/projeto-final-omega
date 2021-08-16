import { Delete, Param, Patch } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateProposalDto } from './dto/createproposal.dto';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {

    constructor(private readonly proposalsService: ProposalsService) {}

    @Get()
    findAll() {
        return this.proposalsService.findAll();
    }

    @Post()
    createProposal(@Body() proposal: CreateProposalDto) {
        return this.proposalsService.createProposal(proposal);
    }

    @Patch(':id')
    hireProposal(@Param('id') id:string) {
        this.proposalsService.hireProposal(id);
    }

    @Delete(':id')
    cancelProposal(@Param('id') id: string) {
        return this.proposalsService.cancelProposal(id);
    }
}
