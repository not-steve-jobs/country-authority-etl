import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@db/database.module';
import { dataSource } from '@db/database.config';
import { Authority } from '@db/data';

import { MigrateAuthority } from './authority.migrator';
import { AuthorityController } from './authority.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Authority], dataSource)],
  providers: [MigrateAuthority],
  controllers: [AuthorityController],
})
export class AuthorityModule {}
