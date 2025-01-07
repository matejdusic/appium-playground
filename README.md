# Appium Mobile Testing Demo

A simple demonstration of mobile test automation using Appium, WebDriverIO, and TypeScript.

## Prerequisites

- Node.js (v14 or higher)
- Java JDK
- Android SDK
- Appium
- An Android emulator

## Project Structure
```
├── tests/
│   ├── animation.test.ts    # Animation feature tests
│   ├── first.test.ts       # Basic navigation tests
│   ├── pages/
│   │   └── main.page.ts    # Page object for main screen
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the Appium server:
```bash
appium
```

3. Start your Android emulator

4. Run the tests:
```bash
npm test
```

## Tests Description

- `first.test.ts`: Basic navigation test that verifies clicking on Accessibility menu
- `animation.test.ts`: Tests the Bouncing Balls animation by tapping at different screen locations
