module.exports = {
  preset: 'ts-jest', // Change this to 'ts-jest' if you're using TypeScript
  testEnvironment: 'node',
  roots: ['<rootDir>/dist'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Change this to handle TypeScript files if needed
    '^.+\\.js$': 'babel-jest', // Use 'babel-jest' for JavaScript files
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Optional: specify your tsconfig file
    },
  },
};
