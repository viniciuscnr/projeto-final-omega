import { Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { Body, Req } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/localandjwt/jwt-auth.guard';
import { CreateProposalDto } from './dto/createproposal.dto';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {

    constructor(private readonly proposalsService: ProposalsService) {}
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req) {
        return this.proposalsService.findAll(req);
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createProposal(@Body() proposal: CreateProposalDto, @Req() req) {
        return this.proposalsService.createProposal(proposal, req);
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    hireProposal(@Param('id') id: string, @Req() req) {
        this.proposalsService.hireProposal(id, req);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    cancelProposal(@Param('id') id: string, @Req() req) {
        return this.proposalsService.cancelProposal(id, req);
    }
}
