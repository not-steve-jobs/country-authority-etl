import request from 'supertest';

import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppConfigService } from '@config';

import { AppModule } from '../src/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;
  let appConfigService: AppConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    appConfigService = await app.resolve(AppConfigService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /status', async () => {
    const { statusCode, body } = await request(app.getHttpServer()).get('/status');

    expect(statusCode).toBe(200);
    expect(body).toMatchObject({
      version: appConfigService.version,
      serviceName: appConfigService.app.serviceName,
      env: appConfigService.app.env,
      plant: appConfigService.app.plant,
    });
  });
});
