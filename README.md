# Amex Person Form Exercise

Amex person record form with backend integration. This project has a [Client](http://chrislehneis.com) and [Api](https://amex-person-form.herokuapp.com/v1.0/people) service.

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#getting-started)
1. [Running the Project](#running-the-project)
1. [Project Structure](#project-structure)
1. [Live Development](#local-development)
    * [Redux DevTools](#redux-devtools)
1. [Routing](#routing)
1. [Building for Production](#building-for-production)
1. [Deployment](#deployment)

## Requirements

* node `^9.8.0`
* yarn `^0.23.0`
* mysql `^5.7`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project based on `amex-person-form` by doing the following:

```bash
$ git clone https://github.com:SyntaxChris/amex-person-form.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management.

```bash
$ yarn  # Install project dependencies
```

In addition to local dependancies, add knex to your global dependancies

```bash
$ yarn global add knex # Install knex cli
```

Add a .env file in the root directory for your environment variable dependencies.

```bash
$ touch .env
```

Your .env file should contain the following:

```text
AWS_SECRET_ACCESS_KEY=aws_secret_access_key
AWS_ACCESS_KEY_ID=aws_access_key_id
AWS_CLOUDFRONT_ID=aws_cloudfront_id
DEV_DB_HOST=127.0.0.1
DEV_DB_USER=local_db_username
DEV_DB_PASS=local_db_user_password
DEV_DB_NAME=amex_people
```

Create a database name called `amex_people` in your local mysql database.

```sql
CREATE DATABASE amex_people;
```

Once you granted full permissions to your mysql database, initialize a knex file

```bash
$ knex init #initialize knexfile
```

Inside your knexfile format your database config

```javascript
module.exports = {
  development: {
    migrations: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },
    client: 'mysql',
    connection: {
      host: db_host,
      user: username,
      password: password,
      database: 'amex_people',
      charset: 'utf8'
    }
  }
}
```

Run a database schema migration for your people table.

```bash
$ knex migrate:latest # create the people table
```

```bash
$ knex seed:run # seed the table with data (optional)
```

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ yarn start  # Start the api server
```

```bash
$ yarn dev  # Start the webpack dev server
```

## Project Structure

The project structure is actually two applications in one repository. The `src` directory for frontend source code and the `lib` directory for api and database integration.  Normally these two directories would be seperated out into two git repositories, but both are included in one repository for simplicity of this exercise.

```
.
├── config                   # App level configuration files
├── lib                      # Api source code
│   ├── models               # Database ORMs     
│   ├── routes               # Api routes     
│   ├── utils                # Api utility modules  
│   ├── index.js             
└── migrations               # People table schema migration 
└── seeds                    # Faker data for people table
├── src                      # Client source code
│   ├── components           # App level components
│   ├── modules              # Redux actions and reducers
│   ├── routes               # Dynamic import routes
│   │   ├── people          
│   │   │   ├── components   # People route components
│   │   │   ├── config       # Person form configuration file
│   │   │   ├── containers   # Redux connect container
│   │   │   ├── index.js     
│   │   ├── index.js         
│   ├── store                # Redux Store
│   ├── styles               # App level styles
└── .babelrc                 
└── .env                     # global environment variables
└── .knexfile.js             # knex configuration file                 
└── manifest.js              # glue configuration file
└── postcss.config.js      
└── server.js                # api server entry point
└── webpack.config.js        # webpack asset compiling, and static asset deployment
```

## Live Development

**It's recommened to use the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

However, it's easy to bundle these developer tools locally should you choose to do so. First, grab the packages from npm:

```bash
yarn add --dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

## Deployment

The frontend assets are deployable by serving the `./dist` folder generated by `yarn deploy`. This is a static deployment to an aws bucket.

The backend api is deployable through the heroku cli.

```bash
$ git push heroku master
```
