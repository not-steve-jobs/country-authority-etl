import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppConfigService } from '@config';

import { StatusDto } from '../models/dto/status.dto';

@Controller('/')
@ApiTags('Health')
export class HealthController {
  constructor(private readonly configService: AppConfigService) {}

  @Get('/status')
  @ApiOperation({ summary: 'Check status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns service metadata',
    type: StatusDto,
  })
  public status(): StatusDto {
    return {
      version: this.configService.version,
      serviceName: this.configService.app.serviceName,
      env: this.configService.app.env,
      plant: this.configService.app.plant,
    };
  }
}
