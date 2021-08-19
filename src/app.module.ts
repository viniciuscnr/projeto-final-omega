import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsModule } from './proposals/proposals.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    //conexão com localhost
    //TypeOrmModule.forRoot({type: 'postgres', host: 'localhost', port: 5432, username: 'omega_admin', password: '3n1L1tq2yVJmZKPJHgEK', database: 'OmegaDB', autoLoadEntities: true, synchronize: true}),
    //conexão com AWS
    TypeOrmModule.forRoot({type: 'postgres', host: 'omegadb.c2qdj1boddoe.us-east-2.rds.amazonaws.com', port: 5432, username: 'postgres', password: 'admin', database: 'OmegaDB', autoLoadEntities: true, synchronize: true}),
    ProposalsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
