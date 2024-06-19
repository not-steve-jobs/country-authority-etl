import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { AppConfigService, loadAppConfig } from '@config';

import { buildDataSourceOptions } from './database.provider';

const config = loadAppConfig();
const configService = new ConfigService(config);
const appConfigService = new AppConfigService(configService);

export const dataSourceMW = new DataSource(
  buildDataSourceOptions(
    {
      type: 'mariadb',
      name: 'MW',
    },
    appConfig => appConfig.mwDB
  )(appConfigService)
);
