import { DataSource } from 'typeorm';
import { validateOrReject } from 'class-validator';

import { DataExtractor } from '@core/data-etl';
import { createInstance } from '@core/utils';

import { CountryToCountryGroupAdminApiEntity } from '../data';

export class CountryToCountryGroupExtractor implements DataExtractor<CountryToCountryGroupAdminApiEntity> {
  constructor(private readonly dataSource: DataSource) {}

  public async fetch(): Promise<CountryToCountryGroupAdminApiEntity[]> {
    const countries = (await this.dataSource.query(
      `
    SELECT c.AlphaTwoCode as countryIso2, cg.Name as countryGroupName FROM core.CountryGroup_LNK_Country cglc
    LEFT JOIN dbo.Country c ON c.NumericCode = cglc.CountryFID
    LEFT JOIN core.CountryGroup cg ON cg.Id = cglc.CountryGroupFID
    `
    )) as Record<string, unknown>[];

    return await this.deserialize(countries);
  }

  private async deserialize(data: Record<string, unknown>[]): Promise<CountryToCountryGroupAdminApiEntity[]> {
    const instances = createInstance(CountryToCountryGroupAdminApiEntity, data);

    await Promise.all(instances.map(inst => validateOrReject(inst)));

    return instances;
  }
}
