import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@core/exception-filter';

import { HealthController } from './modules/health/controllers/health.controller';
import { AppConfigModule } from './config';
import {
  AuthorityModule,
  CountryAuthorityModule,
  CountryGroupModule,
  CountryModule,
  CountryToCountryGroupModule,
} from './modules';

@Module({
  imports: [
    AppConfigModule,
    CountryModule,
    AuthorityModule,
    CountryAuthorityModule,
    CountryGroupModule,
    CountryToCountryGroupModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
  controllers: [HealthController],
})
export class AppModule {}
