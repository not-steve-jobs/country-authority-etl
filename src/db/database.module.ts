import { Module } from '@nestjs/common';

import { DatabaseAdminApiProvider, DatabaseMWProvider, DatabaseProvider } from './database.provider';

@Module({
  imports: [DatabaseProvider, DatabaseMWProvider, DatabaseAdminApiProvider],
})
export class DatabaseModule {}
