import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Prefix
  app.setGlobalPrefix('api/v1');

  //SwaggerUI
  const config = new DocumentBuilder()
    .setTitle('MoodoBackend')
    .setDescription('The MoodoBackend Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Start the API-Server
  await app.listen(3000);
}
bootstrap();
