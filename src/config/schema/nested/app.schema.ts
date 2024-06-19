import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AppSchema {
  @IsInt()
  public port: number;

  @IsString()
  @IsNotEmpty()
  public env: string;

  @IsString()
  @IsNotEmpty()
  public plant: string;

  @IsString()
  @IsNotEmpty()
  public serviceName: string;
}
