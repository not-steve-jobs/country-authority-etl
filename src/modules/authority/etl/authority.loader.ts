import { Repository } from 'typeorm';

import { DataLoader } from '@core/data-etl';
import { Authority } from '@db/data';

export class AuthorityLoader implements DataLoader<Authority> {
  constructor(private readonly authorityRepository: Repository<Authority>) {}

  public async upsert(data: Authority[]): Promise<Authority[]> {
    await this.authorityRepository.upsert(data, ['fullCode']);

    return data;
  }
}
