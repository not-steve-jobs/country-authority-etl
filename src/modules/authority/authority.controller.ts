import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';

import { MigrateAuthority } from './authority.migrator';

@ApiTags('migration')
@Controller('migrate/authority')
export class AuthorityController {
  constructor(private readonly authorityMigrator: MigrateAuthority) {}

  @Post('')
  public async execute(): Promise<{ ok: boolean }> {
    await this.authorityMigrator.execute();

    return { ok: true };
  }

  @Get('status')
  public status(): Record<string, any> {
    return this.authorityMigrator.getStatus();
  }
}
