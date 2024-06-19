import * as path from 'path';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { AppConfigService, loadAppConfig } from '@config';

import { buildDataSourceOptions } from './database.provider';

const config = loadAppConfig();
const configService = new ConfigService(config);
const appConfigService = new AppConfigService(configService);

export const dataSource = new DataSource(
  buildDataSourceOptions(
    {
      type: 'postgres',
      name: 'CountryAuthority',
      entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
    },
    appConfig => appConfig.db
  )(appConfigService)
);
