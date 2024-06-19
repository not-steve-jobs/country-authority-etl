import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Migrator } from '@core/migrator.abstract';
import { CountryAuthority } from '@db/data/country-authority.entity';
import { Country } from '@db/data/country.entity';
import { Authority } from '@db/data/authority.entity';

import { CountriesAuthoritiesMW } from './data';
import { CountryAuthorityExtractor } from './etl/country-authority.extractor';
import { CountryAuthorityTransformer } from './etl/country-authority.transformer';
import { CountryAuthorityLoader } from './etl/country-authority.loader';

@Injectable()
export class MigrateCountryAuthority extends Migrator<CountriesAuthoritiesMW, CountryAuthority> {
  constructor(
    @InjectRepository(Country, 'CountryAuthority')
      countryRepository: Repository<Country>,
    @InjectRepository(Authority, 'CountryAuthority')
      authorityRepository: Repository<Authority>,
    @InjectRepository(CountryAuthority, 'CountryAuthority')
      countryAuthorityRepository: Repository<CountryAuthority>,
    @InjectDataSource('MW') dataSourceMW: DataSource
  ) {
    super(
      new CountryAuthorityExtractor(dataSourceMW),
      new CountryAuthorityTransformer(countryRepository, authorityRepository),
      new CountryAuthorityLoader(countryAuthorityRepository)
    );
  }
}
