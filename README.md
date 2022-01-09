# phisherman.js

A NodeJS wrapper for [phisherman](https://phisherman.gg/) API.

## Installation

```
npm install phisherman.js
yarn add phisherman.js
```

## Example

```typescript
import { PhishermanClient } from 'phisherman.js';

const client = new PhishermanClient({
	apiKey: '<your-api-key>'
});

// Check if domain is a phish or scam
client.check('disczrd.com').then(console.log); // { classification: 'malicious', verifiedPhish: true }

// Report a phish
client.report('https://dicsords-gifted.ru/nitro').then(console.log); // { success: false, message: 'Domain already exists' }
```

## API

### PhishermanClient.constructor(options)

`options` is an object with the following properties:

1. `apiKey` (string): The api key to authorize requests.

### PhishermanClient.check(domain)

Checks if a domain is a phish or scam.

### PhishermanClient.report(domain)

Reports a phish or a scam.

_If you encounter any issues, please join the [Discord Server](https://phisherman.gg/discord) and ask for help, or contact FC#5104._
