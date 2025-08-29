End 2 End Automated testing: Playwrigh, JS.

The project is using Playwright and JavaScript to run automated end-to-end tests for the Ten10 Interest calculator

Prerequisites

Node.js 18+
npm or yarn
Getting started:

Run: npm i to install dependancys

Run: npx playwright install chromium (we are initially running these tests on cromium only)

Running the tests:

Run this to ensure logged in state: node tests/setup/login.setup.js  

Run (all tests):  npx playwright test

Run (one test): find the test and add .only