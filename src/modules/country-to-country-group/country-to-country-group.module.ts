import { DatabaseModule } from '@db/database.module';
import { dataSource } from '@db/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country, CountryGroup, CountryToCountryGroup } from '@db/data';

import { MigrateCountryCountryGroup } from './country-to-country-group.migrator';
import { CountryToCountryGroupController } from './country-to-country-group.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Country, CountryGroup, CountryToCountryGroup], dataSource)],
  providers: [MigrateCountryCountryGroup],
  controllers: [CountryToCountryGroupController],
})
export class CountryToCountryGroupModule {}
