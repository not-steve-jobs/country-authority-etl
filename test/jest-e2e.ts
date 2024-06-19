import { pathsToModuleNameMapper } from 'ts-jest';

import { Config } from '@jest/types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('../tsconfig');

const jestConfig: Config.InitialOptions = {
  detectOpenHandles: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  testTimeout: 15000,
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: compilerOptions.paths
    ? pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/..' })
    : undefined,
  preset: 'ts-jest',
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['<rootDir>/**/**.ts', '!<rootDir>/**/index.ts'],
};

export default jestConfig;
