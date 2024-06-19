import { DataSource } from 'typeorm';
import { validateOrReject } from 'class-validator';

import { DataExtractor } from '@core/data-etl';
import { createInstance } from '@core/utils';

import { CountryGroupAdminApi } from '../data';

/**
 * https://fxpropm.atlassian.net/wiki/spaces/Configs/pages/3842113589/Countries-Authority+DB#Migration-rules.3
 */
export class CountryGroupExtractor implements DataExtractor<CountryGroupAdminApi> {
  constructor(private readonly dataSource: DataSource) {}

  public async fetch(): Promise<CountryGroupAdminApi[]> {
    const countries = (await this.dataSource.query(
      `
      SELECT Name, Description
      FROM core.CountryGroup cg
      join core.CountryGroup_LNK_Country cglc  on cg.Id = cglc.CountryGroupFID
      group by Name, Description
      having count (cglc.CountryGroupFID) > 0
    `
    )) as Record<string, unknown>[];

    return await this.deserialize(countries);
  }

  private async deserialize(data: Record<string, unknown>[]): Promise<CountryGroupAdminApi[]> {
    const instances = createInstance(CountryGroupAdminApi, data);

    await Promise.all(instances.map(inst => validateOrReject(inst)));

    return instances;
  }
}
