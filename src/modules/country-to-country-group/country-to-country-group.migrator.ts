import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Migrator } from '@core/migrator.abstract';
import { Country, CountryGroup, CountryToCountryGroup } from '@db/data';

import { CountryToCountryGroupAdminApiEntity } from './data';
import { CountryToCountryGroupExtractor } from './etl/country-to-country-group.extractor';
import { CountryToCountryGroupTransformer } from './etl/country-to-country-group.transformer';
import { CountryToCountryGroupLoader } from './etl/country-to-country-group.loader';

@Injectable()
export class MigrateCountryCountryGroup extends Migrator<CountryToCountryGroupAdminApiEntity, CountryToCountryGroup> {
  constructor(
      @InjectRepository(CountryToCountryGroup, 'CountryAuthority')
        countryToCountryGroupRepository: Repository<CountryToCountryGroup>,
      @InjectRepository(Country, 'CountryAuthority')
        countryRepository: Repository<Country>,
      @InjectRepository(CountryGroup, 'CountryAuthority')
        countryGroupRepository: Repository<CountryGroup>,
      @InjectDataSource('adminApi') dataSourceAdminApi: DataSource
  ) {
    super(
      new CountryToCountryGroupExtractor(dataSourceAdminApi),
      new CountryToCountryGroupTransformer(countryRepository, countryGroupRepository),
      new CountryToCountryGroupLoader(countryToCountryGroupRepository)
    );
  }
}
