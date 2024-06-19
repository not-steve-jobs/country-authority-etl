import * as config from 'config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { RootSchema } from '../schema';

export const loadAppConfig = (): RootSchema => {
  const appConfig = plainToInstance(RootSchema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(appConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return appConfig;
};
