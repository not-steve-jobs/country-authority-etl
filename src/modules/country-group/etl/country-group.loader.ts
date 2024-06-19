import { Repository } from 'typeorm';

import { DataLoader } from '@core/data-etl';
import { CountryGroup } from '@db/data';

export class CountryGroupLoader implements DataLoader<CountryGroup> {
  constructor(private readonly countryGroupRepository: Repository<CountryGroup>) {}

  public async upsert(data: CountryGroup[]): Promise<CountryGroup[]> {
    await this.countryGroupRepository.upsert(data, ['name']);

    return data;
  }
}
