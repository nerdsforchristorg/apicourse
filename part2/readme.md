# How to create a very simple website

## Create index.js

```bash
toach index.js 

```

## copy and past the following code

```js

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      

```


## Initialize a NPM package
```bash
npm init 

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (part2) 

```

## Respond to the prompts and accept the defaults
```bash

Press ^C at any time to quit.
package name: (part2) 
version: (1.0.0) 
description: sample website
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/randall.melton/repos/apiclass/apicourse/part2/package.json:
```


## Results
```json
{
  "name": "part2",
  "version": "1.0.0",
  "description": "sample website",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## Confirm this is ok, by pressing enter
```bash
Is this OK? (yes) 
```

## Open the file in your editor and add the run dev script
```json
{
  "name": "part2",
  "version": "1.0.0",
  "description": "sample website",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "node index.js",
  },
  "author": "",
  "license": "ISC"
}
```

## Add express to your node project

## install npm packages
```bash
npm install express

```


## install npm packages
```bash
npm install
```


## Test your script by running from the command line the following:
```bash
npm run dev
```