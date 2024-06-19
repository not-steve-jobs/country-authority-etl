import { plainToInstance } from 'class-transformer';

export const createInstance: typeof plainToInstance = (cls, plain, options) =>
  plainToInstance(cls, plain, {
    ...(options || {}),
    enableImplicitConversion: true,
  });
