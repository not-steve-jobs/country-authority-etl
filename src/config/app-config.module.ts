import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './services';
import { loadAppConfig, loadAppEnv } from './loaders';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [loadAppConfig, loadAppEnv] })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
