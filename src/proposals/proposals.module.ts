import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Decoder } from 'src/decoder/decoder';
import { Proposal } from 'src/entities/proposal.entity';
import { UsersModule } from 'src/users/users.module';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';

@Module({
  imports:[TypeOrmModule.forFeature([Proposal]), UsersModule],
  controllers: [ProposalsController],
  providers: [ProposalsService, Decoder]
})
export class ProposalsModule {}
