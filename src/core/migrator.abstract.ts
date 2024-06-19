import { Logger } from '@nestjs/common';

import { DataExtractor, DataLoader, DataTransformer } from './data-etl';
import { MigrationLockedException } from './errors';

export abstract class Migrator<T, R> {
  private lock = false;
  private startTime: string;
  private endTime: string;
  protected readonly logger: Logger;

  protected constructor(
    protected readonly extractor: DataExtractor<T>,
    protected readonly transformer: DataTransformer<T, R>,
    protected readonly loader: DataLoader<R>
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  public async execute(): Promise<void> {
    if (this.isLocked) {
      throw new MigrationLockedException();
    }

    this.logger.log(`Starting migration`);

    try {
      this.startMigration();
      const data = await this.extractor.fetch();
      this.logger.debug(`Extracted ${data.length} items`);
      const transformed = await this.transformer.transform(data);
      this.logger.debug(`Transformed ${transformed.length} items`);
      const saved = await this.loader.upsert(transformed);
      this.logger.debug(`Saved ${saved.length} items`);
    } catch (error) {
      this.handleError(error as Error);
    } finally {
      this.endMigration();
    }
  }

  public getStatus(): MigrationStatus {
    return {
      isRunning: this.isLocked,
      started: this.startTime,
      finished: this.endTime,
    };
  }

  private startMigration(): void {
    this.updateStartState();
    this.lockMigration();
  }

  private endMigration(): void {
    this.logger.debug(`Migration finished`);
    this.unlockMigration();
    this.endTime = new Date().toISOString();
  }

  private handleError(error: Error): void {
    this.logger.error(`Error while processing migration: ${error}`, error);

    throw error;
  }

  private updateStartState(): void {
    this.startTime = new Date().toISOString();
    this.endTime = '';
  }

  private get isLocked(): boolean {
    return this.lock;
  }

  private lockMigration(): void {
    this.logger.debug(`Migration state changed: LOCKED`);
    this.lock = true;
  }

  private unlockMigration(): void {
    this.logger.debug(`Migration state changed: UNLOCKED`);
    this.lock = false;
  }
}

export interface MigrationStatus {
  isRunning: boolean;
  started: string;
  finished: string;
}
