import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, isEmpty } from 'class-validator';

export class CountryMW {
  @IsNotEmpty()
  @Expose()
  @IsString()
  public iso2: string;

  @IsNotEmpty()
  @Expose()
  @IsString()
  public iso3: string;

  @IsNotEmpty()
  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (isEmpty(value) ? undefined : value))
  public group?: string;
}
