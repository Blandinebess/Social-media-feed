// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/__tests__/**/*.(js|jsx)", "**/?(*.)+(spec|test).(js|jsx)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
