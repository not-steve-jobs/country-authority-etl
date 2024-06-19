export interface DataExtractor<T> {
  fetch(): Promise<T[]>;
}

export interface DataLoader<T> {
  upsert(data: T[]): Promise<T[]>;
}

export interface DataTransformer<T, R> {
  transform(data: T[]): R[] | Promise<R[]>;
}
