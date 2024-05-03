# Next.js TODO app

## Features

- [/lists](http://localhost:3000/lists): Have multiple TODO lists that you can share with others.
- [/templates](http://localhost:3000/templates): Templates to initialize a useful list quickly.

## Usage

1. First, setup the `.env.local` file in the main directory with the following variables:
```
POSTGRES_URL=...
POSTGRES_PRISMA_URL=...
POSTGRES_URL_NO_SSL=...
POSTGRES_URL_NON_POOLING=...
POSTGRES_USER=...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=...
```

2. Then seed the database with placeholder data: `npm run seed`.

3. After this, you are free to start the server: `npm run dev`

## Working routes

* [x] /
* [] /login
* [] /signup
* [] /todo-list
  * [x] /[todoListId]
  * [x] /list
  * [] /create
  * [] /delete
  * [] /edit
* [x] /user
  * [x] /[userId]
 