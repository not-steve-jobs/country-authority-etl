import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CountryToCountryGroupAdminApiEntity {
  @IsString()
  @IsNotEmpty()
  @Expose()
  public countryIso2: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  public countryGroupName: string;
}
