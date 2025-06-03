# User API Spec

## Register User API

Endpoint : POST /api/users/register

Request Body

```json
{
  "username": "ligas",
  "password": "rahasia"
}
```

Response Body Success

```json
{
  "token": "unique-token"
}
```

Response Body Failed

```json
{
  "errors": "Username already exists"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body

```json
{
  "username": "ligas",
  "password": "rahasia"
}
```

Response Body Success

```json
{
  "token": "unique-token"
}
```

Response Body Failed

```json
{
  "errors": "Username or password wrong"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization: "token"

Request Body

```json
{
  "id": "current-id"
}
```

Response Body Success

```json
{
  "msg": "Success"
}
```

Response Body Failed

```json
{
  "errors": "Unauthorized"
}
```

## Update User API

Endpoint : PATCH /api/users

Headers :

- Authorization: "token"

Request Body

```json
{
  "data": {
    "username": "newligas", // optional
    "password": "newrahasia" // optional
  }
}
```

Response Body Success

```json
{
  "data": {
    "username": "newligas"
  }
}
```

Response Body Failed

```json
{
  "errors": "Unauthorized"
}
```

## Delete User API

Endpoint : DELETE /api/users

Headers :

- Authorization: "token"

Response Body Success

```json
{
  "msg": "Success"
}
```

Response Body Failed

```json
{
  "errors": "Unauthorized"
}
```
