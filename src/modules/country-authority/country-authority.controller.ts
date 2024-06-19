import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';

import { MigrateCountryAuthority } from './country-authority.migrator';

@ApiTags('migration')
@Controller('migrate/country-authority')
export class CountryAuthorityController {
  constructor(private readonly countryAuthorityMigrator: MigrateCountryAuthority) {}

  @Post('')
  public async execute(): Promise<{ ok: boolean }> {
    await this.countryAuthorityMigrator.execute();

    return { ok: true };
  }

  @Get('status')
  public status(): Record<string, any> {
    return this.countryAuthorityMigrator.getStatus();
  }
}
