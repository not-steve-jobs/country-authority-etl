import { DataTransformer } from 'src/core/data-etl';
import { In, Repository } from 'typeorm';

import { Logger } from '@nestjs/common';
import { Country, CountryGroup, CountryToCountryGroup } from '@db/data';

import { CountryToCountryGroupAdminApiEntity } from '../data';

export class CountryToCountryGroupTransformer
implements DataTransformer<CountryToCountryGroupAdminApiEntity, CountryToCountryGroup>
{
  private readonly logger = new Logger(CountryToCountryGroupTransformer.name);

  constructor(
    private readonly countryRepository: Repository<Country>,
    private readonly countryGroupRepository: Repository<CountryGroup>
  ) {}

  public async transform(caData: CountryToCountryGroupAdminApiEntity[]): Promise<CountryToCountryGroup[]> {
    const [countries, groups] = await Promise.all([
      this.countryRepository.findBy({
        iso2: In(caData.map(ca => ca.countryIso2)),
      }),
      this.countryGroupRepository.findBy({
        name: In(caData.map(ca => ca.countryGroupName)),
      }),
    ]);

    const result: CountryToCountryGroup[] = [];

    const countriesByIso2 = this.countriesMap(countries);

    const groupsByName = this.groupsMap(groups);

    for (const ca of caData) {
      const countryId = countriesByIso2.get(ca.countryIso2);
      const countryGroupId = groupsByName.get(ca.countryGroupName);

      if (countryId && countryGroupId) {
        result.push({ countryId, countryGroupId });
      } else {
        this.logger.warn(`Found Country Group relation where linked rows not found: "${JSON.stringify(ca)}"`);
      }
    }

    return result;
  }

  private countriesMap(countries: Country[]): Map<string, string> {
    return new Map(countries.map(country => [country.iso2, country.id]));
  }

  private groupsMap(groups: CountryGroup[]): Map<string, string> {
    return new Map(groups.map(group => [group.name, group.id]));
  }
}
