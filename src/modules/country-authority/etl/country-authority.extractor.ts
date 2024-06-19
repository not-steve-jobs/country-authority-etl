import { DataSource } from 'typeorm';
import { validateOrReject } from 'class-validator';

import { DataExtractor } from '@core/data-etl';
import { createInstance } from '@core/utils';

import { CountriesAuthoritiesMW } from '../data';

export class CountryAuthorityExtractor implements DataExtractor<CountriesAuthoritiesMW> {
  constructor(private readonly dataSource: DataSource) {}

  public async fetch(): Promise<CountriesAuthoritiesMW[]> {
    const countries = (await this.dataSource.query(
      `SELECT ca.authorityFullCode, ca.adminApiId, ca.countryIso2 FROM cp_countriesAuthorities ca`
    )) as Record<string, unknown>[];

    return await this.deserialize(countries);
  }

  private async deserialize(data: Record<string, unknown>[]): Promise<CountriesAuthoritiesMW[]> {
    const instances = createInstance(CountriesAuthoritiesMW, data);

    await Promise.all(instances.map(inst => validateOrReject(inst)));

    return instances;
  }
}
