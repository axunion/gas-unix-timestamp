# GAS Unix Timestamp

Simple Google Apps Script (GAS) Web App that returns the current UNIX timestamp as JSON.

## Overview

When deployed as a Web App, an HTTP GET request returns a JSON object:

```json
{
  "result": "done",
  "timestamp": 1720000000
}
```

On unexpected failure it returns:

```json
{
  "result": "error",
  "error": "<message>"
}
```

## Project Structure

```
src/
  doGet.ts           # Main handler (compiled for GAS)
  appsscript.json    # GAS project manifest
tsconfig.json        # TypeScript settings (module none for GAS)
package.json         # Scripts & dev dependencies
```

## Requirements

* Node.js 18+ (recommended)
* npm
* Google account (to deploy the script)

Optional (for easier deploy): `@google/clasp` CLI.

## Install

```
git clone <this-repo-url>
cd gas-unix-timestamp
npm install
```

## Build

Compile TypeScript and copy the manifest:

```
npm run build
```

Output JS + manifest are placed in `dist/`.

## Deploy

### Using clasp (recommended)
1. Install clasp globally if you do not have it:
	```
	npm install -g @google/clasp
	```
2. Login:
	```
	clasp login
	```
3. Create a new Apps Script project (once):
	```
	clasp create --type webapp --title "gas-unix-timestamp"
	```
4. Build the project locally:
	```
	npm run build
	```
5. Push compiled code & manifest (from `dist/`):
	```
	clasp push --root dist
	```
6. Deploy a new version:
	```
	clasp deploy --description "First deploy"
	```
7. Copy the Web App URL returned by the deploy command and open it in a browser.

## API

Method: GET

Response (success):
* `result`: string literal `"done"`
* `timestamp`: number (UNIX seconds)

Response (error):
* `result`: `"error"`
* `error`: message string

HTTP status is always 200 (default GAS behavior); detect errors via `result` field.

## Development

TypeScript build:
```
npm run build
```

## Error Handling

Any runtime exception is caught and returned as `{ result: "error", error: <message> }`.
