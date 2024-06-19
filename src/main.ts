import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfigService } from './config';

function setupSwagger(app: INestApplication, version: string): void {
  const config = new DocumentBuilder()
    .setTitle('Country Authority API')
    .setDescription('The Country Authority API description')
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(AppConfigService);
  const port = configService.app.port || 3000;

  if (configService.swagger.enabled) {
    setupSwagger(app, configService.version);
    Logger.log(`Swagger is running on: http://localhost:${port}/api-docs`);
  }

  await app.listen(port, '0.0.0.0');
  Logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch(err => {
  throw new Error(`Service failed to start. Error: ${JSON.stringify(err)}`);
});
