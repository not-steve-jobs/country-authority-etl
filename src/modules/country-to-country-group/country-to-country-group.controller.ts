import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';

import { MigrateCountryCountryGroup } from './country-to-country-group.migrator';

@ApiTags('migration')
@Controller('migrate/country-to-country-group')
export class CountryToCountryGroupController {
  constructor(private readonly countryGroupToCountryMigrator: MigrateCountryCountryGroup) {}

  @Post('')
  public async execute(): Promise<{ ok: boolean }> {
    await this.countryGroupToCountryMigrator.execute();

    return { ok: true };
  }

  @Get('status')
  public status(): Record<string, any> {
    return this.countryGroupToCountryMigrator.getStatus();
  }
}
