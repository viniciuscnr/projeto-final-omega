import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsModule } from './proposals/proposals.module';
import {} from './dbconfig/db.config'
@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_OMEGA,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProposalsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
