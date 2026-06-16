# DTS Test

## Running
### Prerequisites

1. Install Node, latest 22.x, 24.x or 26.x.
2. Clone repository
3. `cd dts-test/`

### Install dependencies
`npm i`

### Run tests
`npm run test`

### View test report
After running tests you can view the report by running: `npm run test:report`

## Design choices

I chose to structure my test(s) using page object models as this lays good groundwork for creating code that can be re-used across tests without polluting test state. So, in short I believe this makes for an easier to maintain code base, which becomes more and more important the larger the code base becomes.

Playwright and TypeScript was a natural choice for me because of my familiarity with JavaScript / TypeScript and with PlayWright being such a popular automation test framework.

I chose to test the-internet.herokuapp.com due to it being easily accessible without needing to run anything locally.

With more time I would test a login page that has a few more failure scenarios and logout functionality. Credentials have been added to a json file so that test suites could test across various environments. I would however in a production environment use some sort of secret manager so that credentials were not stored in plain test as this is a security concern.