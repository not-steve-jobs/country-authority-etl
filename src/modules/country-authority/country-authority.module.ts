import { DatabaseModule } from '@db/database.module';
import { dataSource } from '@db/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority, Country, CountryAuthority } from '@db/data';

import { MigrateCountryAuthority } from './country-authority.migrator';
import { CountryAuthorityController } from './country-authority.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([CountryAuthority, Country, Authority], dataSource)],
  providers: [MigrateCountryAuthority],
  controllers: [CountryAuthorityController],
})
export class CountryAuthorityModule {}
