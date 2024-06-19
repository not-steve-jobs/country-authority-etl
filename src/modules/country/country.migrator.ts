import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Migrator } from '@core/migrator.abstract';
import { Country } from '@db/data';

import { CountryExtractor } from './etl/country.extractor';
import { CountryTransformer } from './etl/country.transformer';
import { CountryLoader } from './etl/country.loader';
import { CountryMW } from './data';

@Injectable()
export class MigrateCountry extends Migrator<CountryMW, Country> {
  constructor(
    @InjectRepository(Country, 'CountryAuthority') countryRepository: Repository<Country>,
    @InjectDataSource('MW') dataSourceMW: DataSource
  ) {
    super(new CountryExtractor(dataSourceMW), new CountryTransformer(), new CountryLoader(countryRepository));
  }
}
