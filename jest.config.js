module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/__tests__/**/*",
  ],
  // Disabling coverage thresholds for initial testing
  // coverageThreshold: {
  //   global: {
  //     branches: 60,
  //     functions: 60,
  //     lines: 60,
  //     statements: 60,
  //   },
  // },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  // Ignore TypeScript definition files
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "\\.d\\.ts$"],
};
