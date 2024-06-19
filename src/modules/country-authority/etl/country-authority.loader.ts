import { Repository } from 'typeorm';

import { CountryAuthority } from '@db/data/country-authority.entity';
import { DataLoader } from '@core/data-etl';

export class CountryAuthorityLoader implements DataLoader<CountryAuthority> {
  constructor(private readonly countryAuthorityRepository: Repository<CountryAuthority>) {}

  public async upsert(data: CountryAuthority[]): Promise<CountryAuthority[]> {
    await this.countryAuthorityRepository.upsert(data, ['countryId', 'authorityId']);

    return data;
  }
}
