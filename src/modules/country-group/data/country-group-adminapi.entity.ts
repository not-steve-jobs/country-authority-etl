import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CountryGroupAdminApi {
  @IsString()
  @IsNotEmpty()
  @Expose()
  public Name: string;

  @IsString()
  @IsOptional()
  @Expose()
  public Description?: string;
}
