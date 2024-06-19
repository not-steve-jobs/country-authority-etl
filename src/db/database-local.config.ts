import * as path from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ConfigService } from '@nestjs/config';
import { AppConfigService, loadAppConfig } from '@config';

import { buildDataSourceOptions } from './database.provider';

const config = loadAppConfig();
const configService = new ConfigService(config);
const appConfigService = new AppConfigService(configService);

// eslint-disable-next-line no-underscore-dangle
export const __dataSourceLocal = new DataSource({
  ...(buildDataSourceOptions(
    {
      type: 'postgres',
      name: 'CP_Local',
      entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
    },
    appConfig => appConfig.db
  )(appConfigService) as PostgresConnectionOptions),
  installExtensions: true,
  synchronize: true,
});
