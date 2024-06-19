import { DataTransformer } from 'src/core/data-etl';

import { Country } from '../../../db/data/country.entity';
import { CountryMW } from '../data';

export class CountryTransformer implements DataTransformer<CountryMW, Country> {
  public transform(countries: CountryMW[]): Country[] {
    return [...countries];
  }
}
