import * as path from 'path';
import { DataSourceOptions } from 'typeorm';

import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService, DbSchema } from '@config';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [AppConfigService],
  useFactory: buildDataSourceOptions(
    {
      type: 'postgres',
      entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
      name: 'CountryAuthority',
    },
    appConfig => appConfig.db
  ),
  name: 'CountryAuthority',
});

export const DatabaseMWProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [AppConfigService],
  useFactory: buildDataSourceOptions(
    {
      type: 'mariadb',
      name: 'MW',
    },
    appConfig => appConfig.mwDB
  ),
  name: 'MW',
});

export const DatabaseAdminApiProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [AppConfigService],
  useFactory: buildDataSourceOptions(
    {
      type: 'mssql',
      name: 'adminApi',
      options: {
        encrypt: false,
      },
    },
    appConfig => appConfig.adminApiDB
  ),
  name: 'adminApi',
});

/**
 * in no case do you change the value of the synchronize parameter to true !!!
 */
export function buildDataSourceOptions(builtins: DataSourceOptions, getConfig: (config: AppConfigService) => DbSchema) {
  return (config: AppConfigService): DataSourceOptions =>
    ({
      ...builtins,
      ...getConfig(config),
      // Do not use synchronize, it's dangerous
      synchronize: false,
      logging: ['error', 'warn', 'schema'],
      installExtensions: false,
    }) as DataSourceOptions;
}
