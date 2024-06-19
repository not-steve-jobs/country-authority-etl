import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule, AppConfigService } from '@config';

import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      controllers: [HealthController],
    })
      .overrideProvider(AppConfigService)
      .useValue({
        app: {
          plant: 'local',
          env: 'local',
          serviceName: 'country-authority-etl',
        },
        version: 'dev',
      })
      .compile();

    healthController = module.get<HealthController>(HealthController);
  });

  it('#status', () => {
    expect(healthController.status()).toEqual({
      serviceName: 'country-authority-etl',
      env: 'local',
      plant: 'local',
      version: 'dev',
    });
  });
});
