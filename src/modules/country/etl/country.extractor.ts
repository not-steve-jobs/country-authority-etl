import { DataSource } from 'typeorm';
import { validateOrReject } from 'class-validator';

import { DataExtractor } from '@core/data-etl';
import { createInstance } from '@core/utils';

import { CountryMW } from '../data';

export class CountryExtractor implements DataExtractor<CountryMW> {
  constructor(private readonly dataSource: DataSource) {}

  public async fetch(): Promise<CountryMW[]> {
    const countries = (await this.dataSource.query(
      `SELECT c.iso2, c.iso3, c.name, c.group FROM cp_countries c`
    )) as Record<string, unknown>[];

    return await this.deserialize(countries);
  }

  private async deserialize(data: Record<string, unknown>[]): Promise<CountryMW[]> {
    const instances = createInstance(CountryMW, data);

    await Promise.all(instances.map(inst => validateOrReject(inst)));

    return instances;
  }
}
