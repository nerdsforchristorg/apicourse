# Readme for APICourse @SAU

# This is a header 1
## This is a header 2
### This is a header 3
#### This is a header 4
##### This is a header 5
###### This is a header 6

* Foo 1
* Foo 2

1) Abc
2) ABD

# API Endpoints Docs

# Get User Information

## GET /users/{id}

### Description
Retrieve detailed information about a user by their unique ID.

### Authentication
Requires a valid API token in the header.

### Parameters
- **id** (string, required): The unique identifier of the user.

### Responses
- **200 OK**: Returns user information.
  ```json
  {
    "id": "123",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

## Create User

## POST /users/

- Body
  ```json
  {
    "id": "123",
    "firstName": "John",
    "lastName" : "Doe",
    "email": "jdoe@example.com"
  }
  ```