# phisherman.gg

A NodeJS wrapper for [phisherman](https://phisherman.gg/) API.

## Installation

```
npm install phisherman.gg
yarn add phisherman.gg
```

## Example

```typescript
import { PhishermanClient } from 'phisherman.gg';

const client = new PhishermanClient({
	apiKey: '<your-api-key>'
});

// Check if domain is a phish or scam
client.check('verified.test.phisherman.gg').then(console.log); // { classification: 'malicious', verifiedPhish: true }

// Report a phish
client.report('https://dicsords-gifted.ru/nitro').then(console.log); // { success: false, message: 'Domain already exists' }
```

## API

### PhishermanClient.constructor(options)

`options` is an object with the following properties:

1. `apiKey` (string): The api key to authorize requests.

### PhishermanClient.check(domain)

Checks the supplied domain against the phisherman database. Returns the classification and status (verified) of the domain, if valid.

### PhishermanClient.info(domain)

Returns information the phisherman database has stored about a phishing domain.

### PhishermanClient.reportCaughtPhish(domain, guildId)

When integrating the Phisherman checks with your Discord bot, you can optionally report back when it catches a phish in your server(s). Reporting back caught phish is entirely optional and not required for normal usage, it is to help the phisherman API with analytics.

### PhishermanClient.reportNewPhish(domain)

Report a new phishing domain to the phisherman API.

_If you encounter any issues, please join the [Discord Server](https://phisherman.gg/discord) and ask for help, or contact FC#5104._
