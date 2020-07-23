module.exports = {
  rootDir: '..',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: false
    }
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/'
  ],
  modulePaths: ['<rootDir>/src']
}
