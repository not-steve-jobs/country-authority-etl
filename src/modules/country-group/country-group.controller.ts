import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';

import { MigrateCountryGroup } from './country-group.migrator';

@ApiTags('migration')
@Controller('migrate/country-group')
export class CountryGroupController {
  constructor(private readonly countryGroupMigrator: MigrateCountryGroup) {}

  @Post('')
  public async execute(): Promise<{ ok: boolean }> {
    await this.countryGroupMigrator.execute();

    return { ok: true };
  }

  @Get('status')
  public status(): Record<string, any> {
    return this.countryGroupMigrator.getStatus();
  }
}
