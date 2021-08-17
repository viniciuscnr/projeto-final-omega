import { Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/localandjwt/Jwt-auth.guard';
import { CreateProposalDto } from './dto/createproposal.dto';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {

    constructor(private readonly proposalsService: ProposalsService) {}
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.proposalsService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createProposal(@Body() proposal: CreateProposalDto) {
        return this.proposalsService.createProposal(proposal);
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    hireProposal(@Param('id') id:string) {
        this.proposalsService.hireProposal(id);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    cancelProposal(@Param('id') id: string) {
        return this.proposalsService.cancelProposal(id);
    }
}
