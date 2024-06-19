import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Migrator } from '@core/migrator.abstract';
import { CountryGroup } from '@db/data';

import { CountryGroupAdminApi } from './data';
import { CountryGroupExtractor } from './etl/country-group.extractor';
import { CountryGroupTransformer } from './etl/country-group.transformer';
import { CountryGroupLoader } from './etl/country-group.loader';

@Injectable()
export class MigrateCountryGroup extends Migrator<CountryGroupAdminApi, CountryGroup> {
  constructor(
    @InjectRepository(CountryGroup, 'CountryAuthority')
      countryGroupRepository: Repository<CountryGroup>,
    @InjectDataSource('adminApi') dataSourceAdminApi: DataSource
  ) {
    super(
      new CountryGroupExtractor(dataSourceAdminApi),
      new CountryGroupTransformer(),
      new CountryGroupLoader(countryGroupRepository)
    );
  }
}
