# The Node Skeleton (beta)

A basic **Node** Boiler-Plate Code, for quickly setting up **API**.

## Getting Started
```
git clone https://github.com/praemineo/node-skeleton.git
cd node-skeleton
./initScript.sh
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
    "author": "praemineo",
    "license": "MIT",
  }
```

## Directory Structure

- *Root*
  - **index.js** -
    Starting point for app execution.

  - **init.js** -
    Initialization sequences which executes once while app starts.

  - **initServer.js** -
    This is called from **init.js**, it loads the config and initializes the server based on it.

  - **initScript.sh** - Shell Script.
    - Deletes the existing *git* repo
    - Initializes new *git* repo
    - Creates the *logs* directory
    - Triggers **NPM install**
    - Creates a fresh *.gitignore*

  - **routes.js** - main *router* file, called and mounted from *init.js*.
    - this where all the *sub-routers* from *user_modules* are mounted on.
    - this will also contains the *404* not-found middle-ware and also the *500* server error middle-ware

- *config*
  - **app.json** - Main config file for the app.
      ```
      {
        "development": { //NODE_ENV
          "server": {   //Server Setting
            "port": 4444, // the Port Number
            "protocol": "http", // the Protocol
            "socket": true // enable Socket ?
          },
          "db": { // DataBase
              "host": "localhost", // DB Host
              "port": 27017, // DB port
              "database": "mongoDB" // DB type
              }
          }
      }
      ```

  - **bunyan.js** - Initializes the the BunyanJS, Exports the Logger.

  - **error.js** - Common Errors Config, Exports getError function.
    - getError
      - input - errorSting, data
      - returns - the errorObject.

  - **helper.js** - Processes *NODE_ENV* and logs info or error.

  - **index.js** - calls, helper.js, bunyan.js and app.json and returns logger.

  - **ssl** the directory in which all the ssl files and certificates.

- *user_modules*
    This will contain all the code from the users.

    - *Sample user created module.*
    - **module_name**
      - **router.js** - all the routes related to the module.
      - **crud.js** - the *CRUD* for the module.
      - **middleware.js** - the middleware to be used in the module.
      - **schema.js**
      - **validator.js**

- **eslint.rc** - eslint configuration file.
  - constains basic configuration and rules for linting.
  - update this file to add specific rules for your project
