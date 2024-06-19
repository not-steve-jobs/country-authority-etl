import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DbSchema {
  @IsString()
  @IsNotEmpty()
  public host: string;

  @IsInt()
  public port: number;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public database: string;
}
