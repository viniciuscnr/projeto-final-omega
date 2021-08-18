import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsModule } from './proposals/proposals.module';
import {params} from './dbconfig/db.config'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host:  params.DATABASE_HOST,
      port: parseInt(params.DB_PORT),
      username: params.DB_USERNAME,
      password: params.DB_PASSWORD,
      database: params.OMEGA_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProposalsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
