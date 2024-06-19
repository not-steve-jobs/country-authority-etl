import { In, Repository } from 'typeorm';

import { DataTransformer } from '@core/data-etl';
import { Logger } from '@nestjs/common';
import { Country } from '@db/data/country.entity';
import { Authority } from '@db/data/authority.entity';
import { CountryAuthority } from '@db/data/country-authority.entity';

import { CountriesAuthoritiesMW } from '../data';
export class CountryAuthorityTransformer implements DataTransformer<CountriesAuthoritiesMW, CountryAuthority> {
  private readonly logger = new Logger(CountryAuthorityTransformer.name);

  constructor(
    private readonly countryRepository: Repository<Country>,
    private readonly authorityRepository: Repository<Authority>
  ) {}

  public async transform(caData: CountriesAuthoritiesMW[]): Promise<CountryAuthority[]> {
    const [countries, authorities] = await Promise.all([
      this.countryRepository.findBy({
        iso2: In(caData.map(ca => ca.countryIso2)),
      }),
      this.authorityRepository.findBy({
        fullCode: In(caData.map(ca => ca.authorityFullCode)),
      }),
    ]);

    const result: CountryAuthority[] = [];

    const countriesByIso2 = this.countriesMap(countries);

    const authoritiesByFullCode = this.authoritiesMap(authorities);

    for (const ca of caData) {
      const countryId = countriesByIso2.get(ca.countryIso2);
      const authorityId = authoritiesByFullCode.get(ca.authorityFullCode);

      if (countryId && authorityId) {
        result.push({ authorityId, countryId });
      } else {
        this.logger.warn(`Found CA relation where linked rows not found: "${JSON.stringify(ca)}"`);
      }
    }

    return result;
  }

  private countriesMap(countries: Country[]): Map<string, string> {
    return new Map(countries.map(country => [country.iso2, country.id]));
  }

  private authoritiesMap(authorities: Authority[]): Map<string, string> {
    return new Map(authorities.map(authority => [authority.fullCode, authority.id]));
  }
}
