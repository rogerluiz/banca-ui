module.exports = {
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.[jt]s?(x)',
    '!src/index.[jt]s?(x)',
    '!src/__tests__/**/*.[jt]s?(x)',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
  testResultsProcessor: 'jest-sonar-reporter',
};
