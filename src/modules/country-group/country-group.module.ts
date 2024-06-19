import { DatabaseModule } from '@db/database.module';
import { dataSource } from '@db/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryGroup } from '@db/data';

import { MigrateCountryGroup } from './country-group.migrator';
import { CountryGroupController } from './country-group.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([CountryGroup], dataSource)],
  providers: [MigrateCountryGroup],
  controllers: [CountryGroupController],
})
export class CountryGroupModule {}
