import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { AppSchema, DbSchema, SwaggerSchema } from './nested';

export class RootSchema {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AppSchema)
  public app: AppSchema;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => DbSchema)
  public db: DbSchema;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => DbSchema)
  public mwDB: DbSchema;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => DbSchema)
  public adminApiDB: DbSchema;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => SwaggerSchema)
  public swagger: SwaggerSchema;

  public version: string;
}
