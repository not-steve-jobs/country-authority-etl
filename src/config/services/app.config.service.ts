import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { AppSchema, DbSchema, SwaggerSchema } from '../schema';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get adminApiDB(): DbSchema {
    return this.configService.get<DbSchema>('adminApiDB');
  }

  get mwDB(): DbSchema {
    return this.configService.get<DbSchema>('mwDB');
  }

  get db(): DbSchema {
    return this.configService.get<DbSchema>('db');
  }

  get app(): AppSchema {
    return this.configService.get<AppSchema>('app');
  }

  get swagger(): SwaggerSchema {
    return this.configService.get<SwaggerSchema>('swagger');
  }

  get version(): string {
    return this.configService.get<string>('version') ?? 'dev';
  }
}
