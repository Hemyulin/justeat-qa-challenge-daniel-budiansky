# Just Eat Takeaway – QA Automation Challenge
Author: **Daniel Budiansky**

This repository contains my Playwright-based solution for the automated UI test cases requested in the Just Eat Takeaway QA Engineer Challenge.

The project includes automated coverage for:

- **Test Case 1:** Search job title “Test”, verify multi-location results, filter to Netherlands, verify all results belong to the Netherlands.
- **Test Case 2:** Select category “Sales”, verify count and category consistency, refine to Germany, verify results remain Sales-only and counts match.

Playwright was chosen for its reliability, cross-browser support, trace viewer capabilities, and clean API.

## 🚀 Tech Stack

- **Node.js** (>= 18)
- **Playwright**
- **TypeScript**

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Hemyulin/justeat-qa-challenge-daniel-budiansky.git
cd justeat-qa-challenge-daniel-budiansky
```

Install dependencies:

```bash
yarn install
```

(or)

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## ▶️ Running the tests

### Run all tests:

```bash
npx playwright test
```

### Run one test file:

```bash
npx playwright test tests/testcases.spec.ts
```

### Run with UI (shows browser and steps):

```bash
npx playwright test --ui
```

### Run in headed mode:

```bash
npx playwright test --headed
```

## 📝 Test Structure

```
tests/
  └── testcases.spec.ts   # Contains Test Case 1 & Test Case 2 automation
playwright.config.ts      # Browser config, timeouts, retries, trace settings
```

## 📹 Viewing Trace / Replay

To open a trace:

```bash
npx playwright show-trace trace.zip
```

Or open the full report:

```bash
npx playwright show-report
```

This includes:
- step-by-step timeline  
- DOM snapshots  
- network logs  
- console logs  
- screenshots  
- video (if enabled)

## 📄 About the Challenge

This repository automates the two UI scenarios from the Just Eat Takeaway QA Engineer Challenge.  
The goal was to:

- Implement reliable selectors  
- Validate counts and filters  
- Capture DOM text consistently  
- Keep tests readable and maintainable  
- Avoid record/play tools as requested  

The test suite focuses on behaviour, not pixel-perfect UI verification.
