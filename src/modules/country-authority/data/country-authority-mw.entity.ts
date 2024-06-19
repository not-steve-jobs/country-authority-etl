import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CountriesAuthoritiesMW {
  @IsString()
  @IsNotEmpty()
  @Expose()
  public authorityFullCode: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  public countryIso2: string;
}
