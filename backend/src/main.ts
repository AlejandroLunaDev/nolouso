import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no válidas
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no válidas
      transform: true, // Transforma los objetos recibidos a clases DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mi API Documentacion')
    .setDescription('The users API description') // Cambié "cats" por "users"
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
}
bootstrap();
