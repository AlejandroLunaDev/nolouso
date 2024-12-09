import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Dominio permitido (frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados personalizados
  });

  // Configuración del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no válidas
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no válidas
      transform: true, // Transforma los objetos recibidos a clases DTO
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Mi API Documentacion')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8080);
}
bootstrap();
