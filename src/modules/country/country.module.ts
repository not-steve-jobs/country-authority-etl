import { DatabaseModule } from '@db/database.module';
import { dataSource } from '@db/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '@db/data';

import { MigrateCountry } from './country.migrator';
import { CountryController } from './country.controller';
@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Country], dataSource)],
  providers: [MigrateCountry],
  controllers: [CountryController],
})
export class CountryModule {}
