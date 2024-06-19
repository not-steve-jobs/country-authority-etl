import { DataTransformer } from 'src/core/data-etl';

import { CountryGroup } from '@db/data';

import { CountryGroupAdminApi } from '../data';

export class CountryGroupTransformer implements DataTransformer<CountryGroupAdminApi, CountryGroup> {
  public transform(countryGroups: CountryGroupAdminApi[]): CountryGroup[] {
    return countryGroups.map(cg => ({
      name: cg.Name,
      description: cg.Description,
    }));
  }
}
