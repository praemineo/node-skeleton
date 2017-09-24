# The Node Skeleton (beta)#
A basic **Node** Boiler-Plate Code, for quickly setting up **API**.

## Getting Started
```
git clone https://github.com/preeminence/node-skeleton.git
cd node-skeleton
npm install
npm run dev
```

## Usage
### package.json
```
{
    "name": "the-node-skeleton",
    "version": "1.1.0",
    "description": "The Node skeleton",
    "main": "index.js",
    "scripts": {
      "dev": "export NODE_ENV=development && echo 'Node environment set to development' && nodemon index.js && exit 0",
      "start": "(pm2 stop 'the-node-skeleton' || echo 'Nothing to kill') && pm2 start index.js --name 'the-node-skeleton'",
    },
    "keywords": [
      "Node",
      "Skeleton",
      "ES6"
    ],
    "author": "preeminece",
    "license": "MIT",
  }
```

## Directory Structure
- *index.js*
  Starting point for app execution.

- *init.js*
  Initialization sequences which executes once while app starts.


## NPM Modules
- *express*
  For HTTP communication

- *helmet*
  Security suit implementation

- *bluebird*
  Bluebird promise implementation

- *nodemon*
  For restart on change while development phase

- *pm2*
  For restart on error while production phase
