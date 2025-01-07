# Appium Mobile Testing Project

A test automation framework for Android applications using Appium, WebdriverIO, and TypeScript.

## Prerequisites

- Node.js (v14 or higher)
- Java JDK (for Android SDK)
- Android SDK
- Appium Server
- Android Emulator or physical device

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the Appium server:
```bash
appium
```

4. Run tests:
```bash
npm run test:all          # Run all tests
npm run test:animation    # Run animation tests
npm run test:dialog      # Run dialog tests
```

## Project Structure

```
├── tests/
│   ├── pages/           # Page Object Models
│   ├── helpers/         # Test helpers and utilities
│   └── *.test.ts       # Test files
├── screenshots/         # Test failure screenshots
└── ApiDemos-debug.apk  # Test application
```

## Features

- Page Object Model design pattern
- Screenshot capture on test failures
- Automatic screenshot cleanup
- TypeScript for better code maintainability
- Custom test commands for specific features

## Test Categories

- Animation Tests
- Dialog Tests
- Main Screen Tests
- Default Layout Tests

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

MIT
