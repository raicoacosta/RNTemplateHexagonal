module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@components/(.*)$': '<rootDir>/src/app/shared/Components/$1',
    '^@helpers/(.*)$': '<rootDir>/src/app/shared/Helpers/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],
};
