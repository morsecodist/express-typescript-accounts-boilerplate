# Express JS Typescript Boilerplate

## Description

A very simple app with account creation, login, and updating. Intended for modification to build a larger app with accounts. This app uses passport authentication and mongoose for a user model. This repository is primarily to show my competency with Typescript, Node.js, and MongoDB.

If you use this in production you might want to add:
* password confirmation
* requiring password reentry for update
* data validation for email addresses
* password requirements (ex. min length)

## Usage

Install dependencies:

```
npm install
```

Build SASS (optional):

```
gulp build
```

Create a `.env` file in the root directory and fill in:

```
MONGODB=url_of_mongodb
SECRET=secret_for_sessions
```

Before building start mongodb. If you want to run locally you can use the script provided. Make sure you have mongodb installed. Script will use `./devdb` for file storage:

```
./scripts/mongo.sh
```

Run:

```
npm start
```

To build, run server, and watch for SASS updates (for development):

```
./scripts/build_dev.sh
```
