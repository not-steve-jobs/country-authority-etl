import { BadRequestException } from '@nestjs/common';

export class MigrationLockedException extends BadRequestException {
  constructor() {
    super('Migration lock is taken');
  }
}
