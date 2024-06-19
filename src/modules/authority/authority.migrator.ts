import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Migrator } from '@core/migrator.abstract';
import { Authority } from '@db/data';

import { AuthoritiesMW } from './data';
import { AuthorityExtractor, AuthorityLoader, AuthorityTransformer } from './etl';

@Injectable()
export class MigrateAuthority extends Migrator<AuthoritiesMW, AuthoritiesMW> {
  constructor(
    @InjectRepository(Authority, 'CountryAuthority')
      authorityRepository: Repository<Authority>,
    @InjectDataSource('MW') dataSourceMW: DataSource
  ) {
    super(new AuthorityExtractor(dataSourceMW), new AuthorityTransformer(), new AuthorityLoader(authorityRepository));
  }
}
