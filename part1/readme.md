# Readme for APICourse @SAU

 
# API Endpoints

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
