import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty({ example: 'country-authority-etl' })
  public serviceName: string;

  @ApiProperty({ example: '1.0.0' })
  public version: string;

  @ApiProperty({ example: 'dev' })
  public env: string;

  @ApiProperty({ example: 'int' })
  public plant: string;
}
