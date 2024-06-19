import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthoritiesMW {
  @IsString()
  @IsNotEmpty()
  @Expose()
  public fullCode: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  public name: string;
}
