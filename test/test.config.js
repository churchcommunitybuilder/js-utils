const { defaults: tsJestConfig } = require('ts-jest/presets')

module.exports = {
  rootDir: '..',
  ...tsJestConfig,
  cacheDirectory: '.jest',
//   globals: {
//     'ts-jest': {
//       babelConfig: false,
//       tsConfig: './tsconfig.jest.json',
//     },
//   },
//   moduleNameMapper: {
//     '^testUtils': '<rootDir>/test/utils',
//     '^assets(.*)': '<rootDir>/assets$1',
//   },
  modulePaths: ['<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: false,
//   collectCoverageFrom: [
//     'src/domains/**/*',
//     '!src/domains/**/{navigators}/**/index.ts',
//     'src/lib/{api,components,selectors,ducks,thunks,utils,hooks}/**/*',
//     '!**/{components,screens}/**/index.ts',
//     '!**/*TestIds.ts',
//     '!**/types/**/*',
//     '!**/*.snap',
//   ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10
  //   }
  // }
}
