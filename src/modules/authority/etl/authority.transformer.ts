import { DataTransformer } from 'src/core/data-etl';

import { Authority } from '@db/data';

import { AuthoritiesMW } from '../data';

export class AuthorityTransformer implements DataTransformer<AuthoritiesMW, Authority> {
  public transform(authorities: AuthoritiesMW[]): Authority[] {
    return [...authorities];
  }
}
