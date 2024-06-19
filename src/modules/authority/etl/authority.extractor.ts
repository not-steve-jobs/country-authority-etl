import { DataSource } from 'typeorm';
import { validateOrReject } from 'class-validator';

import { DataExtractor } from '@core/data-etl';
import { createInstance } from '@core/utils';

import { AuthoritiesMW } from '../data';

export class AuthorityExtractor implements DataExtractor<AuthoritiesMW> {
  constructor(private readonly dataSource: DataSource) {}

  public async fetch(): Promise<AuthoritiesMW[]> {
    const countries = (await this.dataSource.query(`SELECT a.fullCode, a.name FROM cp_authorities a`)) as Record<
      string,
      unknown
    >[];

    return await this.deserialize(countries);
  }

  private async deserialize(data: Record<string, unknown>[]): Promise<AuthoritiesMW[]> {
    const instances = createInstance(AuthoritiesMW, data);

    await Promise.all(instances.map(inst => validateOrReject(inst)));

    return instances;
  }
}
