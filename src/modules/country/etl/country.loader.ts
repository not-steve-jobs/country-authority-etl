import { Repository } from 'typeorm';

import { DataLoader } from '@core/data-etl';
import { Country } from '@db/data';

export class CountryLoader implements DataLoader<Country> {
  constructor(private readonly countryRepository: Repository<Country>) {}

  public async upsert(data: Country[]): Promise<Country[]> {
    await this.countryRepository.upsert(data, ['iso2']);

    return data;
  }
}
