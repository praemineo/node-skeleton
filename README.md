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

- Root
    - **index.js** :- 
      Starting point for app execution.

    - **init.js** :- 
      Initialization sequences which executes once while app starts.

    - **initServer.js** :- 
      This is called from **init.js**, it loads the config and initializes the server based on it. 

    - **initScript.sh** :- Shell Script. 
        - Deletes the existing *git* repo 
        - Initializes new *git* repo
        - Creates the *logs* directory
        - Triggers **NPM install**
        - Creates a fresh *.gitignore*
  

