import { Repository } from 'typeorm';

import { DataLoader } from '@core/data-etl';
import { CountryToCountryGroup } from '@db/data';

export class CountryToCountryGroupLoader implements DataLoader<CountryToCountryGroup> {
  constructor(private readonly countryToCountryGroupRepository: Repository<CountryToCountryGroup>) {}

  public async upsert(data: CountryToCountryGroup[]): Promise<CountryToCountryGroup[]> {
    await this.countryToCountryGroupRepository.upsert(data, ['countryId', 'countryGroupId']);

    return data;
  }
}
