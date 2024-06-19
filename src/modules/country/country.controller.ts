import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';

import { MigrateCountry } from './country.migrator';

@ApiTags('migration')
@Controller('migrate/country')
export class CountryController {
  constructor(private readonly countryMigrator: MigrateCountry) {}

  @Post('')
  public async execute(): Promise<{ ok: boolean }> {
    await this.countryMigrator.execute();

    return { ok: true };
  }

  @Get('status')
  public status(): Record<string, any> {
    return this.countryMigrator.getStatus();
  }
}
