# Simple Books API

This API allows you to fetch,create,update and delete book.

The API is available at `https://api-book-directory.herokuapp.com/`

## Endpoints

### List of books

GET `/books`

Returns a list of books.

### Get a single book

GET `/books/:id`

Retrieve detailed information about a book.

### Create a book

POST `/books/create`

Allows you to create a new book. Requires authentication.

The request body needs to be in JSON format and include the following properties:

-   `title` - String- Required
-   `author` - String - Required
-   `image` - String - Required (must use upload file input)

Example

```
POST /books/create
Authorization: Bearer <YOUR TOKEN>
{
  "title": "Javascript",
  "author": "Brendan Eich"
}
```

The response body will contain the following object.

```
{
    "message": "You successfully created a post",
    "savedBook": {
        "title": "Java",
        "author": "James Goslin",
        "_id": "621cffb54d718b73f2662cd2",
        "__v": 0
    }
}

```

### Update a book

PUT `/books/update/:id`

Update an existing book. Requires authentication.

The request body needs to be in JSON format and allows you to update the following properties:

-   `title` - String- Required
-   `author` - String - Required

Example

```
PUT /books/update/621cffb54d718b73f2662cd2
Authorization: Bearer <YOUR TOKEN>
{
  "title": "Python",
  "author": "Guido van Rossum"
}
```

### Delete a book

DELETE `/books/delete/:id`

Delete an existing book. Requires authentication.

The request body needs to be empty.

Example

```
DELETE /books/delete/621cffb54d718b73f2662cd2
Authorization: Bearer <YOUR TOKEN>
```

## API Authentication

To create or update or delete a book, you need to register and then login.

### SIGNUP

POST `/auth/signup`

The request body needs to be in JSON format and include the following properties:

-   `name` - String
-   `email` - String
-   `password` - String

Example

```
{
   "name": "John",
   "email": "example@gmail.com"
   "password": "pass@123"
}
```

### LOGIN

POST `/auth/login`

The request body needs to be in JSON format and include the following properties:

-   `email` - String
-   `password` - String

Example

```
{
   "email": "example@gmail.com"
   "password": "pass@123"
}
```

The response body will contain the access token and other information about user. The access token is valid for 1 hour.

**Possible errors**

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |
