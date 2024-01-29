
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## about this project
```bash
response time : 80ms-150ms-500ms

/auth/login  //POST login both user and admin can login
/auth/signup //POST signup  only admin can create a new account and assign a role to it weather user or admin , example
{ 
    "username" : "aceiny",
    "password" : "1234",
    "role" : "USER" or
    "role" : "ADMIN" 
}
/event //GET get all events , you can use filtering with all event values 
/event/:id //GET get a single event by id
/event //POST create a new event with event data and event poster -image- can only be accesd by admin example 
{
            "title" : "this is a title",
            "description" : "wow",
            "date" : "25 sep 2022 ",
            "location" : "medjana " ,
            "poster" : one image buffer
}

/event/:id //PATCH update any field of an existing event ,  needs to be admin example 
{
  "status" : "OPEN" or 
  "status" : "CLOSED"
}
/event/:id //DELETE delte event , needs to be admin

```