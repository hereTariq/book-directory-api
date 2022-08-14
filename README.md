# Simple Books API

This API allows you to fetch,create,update and delete book.

INSTRUCTION FOR CREATING AND UPDATING THE BOOK

This API is expecting three inputs - title, author, and image and for the image API is expecting as a upload image not the url of the image.
So if you are using postman then you do not have to enter all the inputs in JSON of the Body section rather you have to use the form-data of the Body section.
If you are using JavaScript then you have to use built-in FormData() constructor to upload all the data.

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

Allows you to create a new book. Requires authentication and authorisation.

The request body needs to be in form-data format and include the following properties:
In the postman Goto the Body => form-data then input key and its value
keys are: title, author, and image(select file not the text)

-   `title` - String- Required
-   `author` - String - Required
-   `image` - String - Required (file (imgage))

### Example

POST /books/create
Authorization: Bearer <YOUR TOKEN>

Example of input fields and the response using postman

![Example](https://github.com/hereTariq/book-directory-api/blob/master/images/radmeImages/example.png)

### Update a book

PUT `/books/update/:id`

Update an existing book. Requires authentication and authorisation.

The request body needs to be in form-data format and allows you to update the following properties:

-   `title` - String- Required
-   `author` - String - Required
-   `image` - String - Required (file (image))

### Example

PUT /books/update/621cffb54d718b73f2662cd2
Authorization: Bearer <YOUR TOKEN>

![Example](https://github.com/hereTariq/book-directory-api/blob/master/images/radmeImages/update.png)

### Delete a book

DELETE `/books/delete/:id`

Delete an existing book. Requires authentication and authorisation.

The request body needs to be empty.

Example

```
DELETE /books/delete/621cffb54d718b73f2662cd2
Authorization: Bearer <YOUR TOKEN>

```

## API Authentication

To create or update or delete a book, you need to signup and then login.

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

The response body will contain the access token and other information about user. The access token is valid for 10 hour.

## Note

You can update and delete only your books the one you have created.
You can not delete and update others book.

**Possible errors**

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |
