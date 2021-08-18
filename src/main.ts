import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
  .setTitle('Projeto Final Omega')
  .setDescription('API do projeto final do programa de treinamento da Omega Energia')
  .setVersion('1.0')
  .addTag('projeto')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('projeto', app, document);
  
  await app.listen(3000);
}
bootstrap();
