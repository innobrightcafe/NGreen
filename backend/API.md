# NGREEN API Documentation

## Introduction

This document provides a comprehensive guide to using the NGREEN API. The API allows interaction with users, carriers, wallets, transactions, orders, OTPs, and ratings. This guide will cover the available endpoints, their purposes, and how to use them effectively.

## Base URL

The base URL for all API endpoints is: http://127.0.0.1:3000/

## Authentication

NOTE: otp will expire after 10 minutes and it is use once only

### Admin Authentication

POST /auth/users
Request:
```json
{
  "email": "testuser@ngreen.usr",
  "password": "tester123"
}
Response:
{
   "message": "OTP sent to your email" 
}
```

POST /auth/users/token
Request:
```json
{
  "otp": <otp>
}
Response:
{
  "user": {
    "id": "<admin_id>"
  },
  "token": "<admin_token>"
}
```

### User Authentication
POST /auth/users
Request:
```json
{
  "email": "<user_email>",
  "password": "<user_password>"
}
Response:
{
   "message": "OTP sent to your email" 
}

POST /auth/users/token
Request:
```json
{
  "otp": <otp>
}
Response:
{
  "user": {
    "id": "<user_id>"
  },
  "token": "<user_token>"
}
```
### Carrier Authentication
POST /auth/carriers
Request:
```json
{
  "email": "<carrier_email>",
  "password": "<carrier_password>"
}
Response:
{
   "message": "OTP sent to your email" 
}

POST /auth/carriers/token
Request:
```json
{
  "otp": <otp>
}
Response:
{
  "carrier": {
    "id": "<carrier_id>"
  },
  "token": "<carrier_token>"
}
```

## Users
### Create User
POST /users
Request:
```json
{
  "email": "test@ngreen.usr",
  "password": "Testxx",
  "pnumber": "0703452xx45",
  "fname": "Mxxa",
  "lname": "Mxxa"
}
Response:
{
  "id": "<user_id>",
  "email": "test@ngreen.usr",
  "pnumber": "0703452xx45",
  "fname": "Mxxa",
  "lname": "Mxxa"
}
```
### Update User
PUT /users/:user_id
Request Headers:
Authorization: Bearer <user_token>
Request:
```json
{
  "lname": "usxxpha"
}
Response:
{
  "id": "<user_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Musa",
  "lname": "usxxpha"
}
```
### Get User
GET /users/:user_id
Request Headers:
Authorization: Bearer <user_token>
Response:
```json
{
  "id": "<user_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Musa",
  "lname": "Musa"
}
```
### Get All Users
GET /users
Request Headers:
Authorization: Bearer <user_token>
Response:
```json
[
  {
    "id": "<user_id>",
    "email": "test@ngreen.usr",
    "pnumber": "07034526545",
    "fname": "Musa",
    "lname": "Musa"
  }
]
```

## Carriers
### Create Carrier
POST /carriers
Request:
```json
{
  "email": "test@ngreen.usr",
  "password": "Tester1111",
  "pnumber": "07034526545",
  "fname": "Musa",
  "lname": "Mustapha",
  "account_name": "Musa Mustapha",
  "account_bank": "Zenith Bank",
  "account_number": 70xxx456123
}
Response:
{
  "id": "<carrier_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Musa",
  "lname": "Mustapha",
  "account_name": "Musa Mustapha",
  "account_bank": "Zenith Bank",
  "account_number": 708xx56123
}
```
### Update Carrier
PUT /carriers/:carrier_id
Request Headers:
Authorization: Bearer <carrier_token>
Request:
```json
{
  "fname": "Mumin"
}
Response:
{
  "id": "<carrier_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Mumin",
  "lname": "Mustapha"
}
```
### Get Carrier
GET /carriers/:carrier_id
Request Headers:
Authorization: Bearer <carrier_token>
Response:
```json
{
  "id": "<carrier_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Mumin",
  "lname": "Mustapha"
}
```
### Get All Carriers
GET /carriers
Request Headers:
Authorization: Bearer <carrier_token>
Response:
```json
[
  {
    "id": "<carrier_id>",
    "email": "test@ngreen.usr",
    "pnumber": "07034526545",
    "fname": "Mumin",
    "lname": "Mustapha"
  }
]
```
### Approve Carrier
PUT /carriers/:carrier_id/approve
Request Headers:
Authorization: Bearer <admin_token>
Response:
```json
{
  "id": "<carrier_id>",
  "approved": True
}
```
### Get Approved Carriers
GET /carriers?active=1&approved=1
Request Headers:
Authorization: Bearer <carrier_token>
Response:
```json
[
  {
    "id": "<carrier_id>",
    "email": "test@ngreen.usr",
    "pnumber": "07034526545",
    "fname": "Mumin",
    "lname": "Mustapha",
    "status": "approved"
  }
]
```

## Wallets
### Get All Wallets
GET /wallets
Request Headers:
Authorization: Bearer <admin_token>
Response:
```json

[
  {
    "id": "<wallet_id>",
    "balance": 1000.00,
    "user_id": "<user_id>"
  }
]
```
### Get Wallet of a User by Admin
GET /wallets/:user_id/users
Request Headers:
Authorization: Bearer <admin_token>
Response:
```json
{
  "id": "<wallet_id>",
  "balance": 1000.00,
  "user_id": "<user_id>"
}
```
### Get Wallet of Current User
GET /wallets/current
Request Headers:
Authorization: Bearer <user_token>
```Response:
json

{
  "id": "<wallet_id>",
  "balance": 1000.00,
  "user_id": "<user_id>"
}
```

## Transactions
### Create Transaction
POST /transactions
Request Headers:
Authorization: Bearer <user_token>
Request:
```json
{
  "amount": 1500.00,
  "description": "Test",
  "type": "credit"
}
Response:
{
  "id": "<transaction_id>",
  "amount": 1500.00,
  "description": "Test",
  "type": "credit",
  "status": "pending"
}
```
### Get All Transactions of a User
GET /transactions
Request Headers:
Authorization: Bearer <user_token>
Response:
```json
[
  {
    "id": "<transaction_id>",
    "amount": 1500.00,
    "description": "Test",
    "type": "credit",
    "status": "completed"
  }
]
```
### Get All Transactions by Admin
GET /transactions
Request Headers:
Authorization: Bearer <admin_token>
Response:
```json
[
  {
    "id": "<transaction_id>",
    "amount": 1500.00,
    "description": "Test",
    "type": "credit",
    "status": "completed"
  }
]
```
### Get Transaction by ID
GET /transactions/:transaction_id
Request Headers:
Authorization: Bearer <user_token>
Response:
```json
{
  "id": "<transaction_id>",
  "amount": 1500.00,
  "description": "Test",
  "type": "credit",
  "status": "completed"
}
```

## Orders
### Create Order
POST /orders
Request Headers:
Authorization: Bearer <user_token>
Request:
```json
{
  "amount": 1000.00,
  "description": "Let us ride"
}
Response:
{
  "id": "<order_id>",
  "amount": 1000.00,
  "description": "Let us ride",
 "status": "pending"
}
```
### Add Carrier to Order
PUT /orders/:order_id
Request Headers:
Authorization: Bearer <user_token>
Request:
```json
{
  "carrier_id": "<carrier_id>"
}
Response:
{
  "id": "<order_id>",
  "amount": 1000.00,
  "description": "Let us ride",
  "carrier_id": "<carrier_id>",
  "status": "assigned"
}
```
### Get All Orders by Admin
GET /orders
Request Headers:
Authorization: Bearer <admin_token>
```Response:
[
  {
    "id": "<order_id>",
    "amount": 1000.00,
    "description": "Let us ride",
    "status": "completed"
  }
]
```
### Get All Orders of a User
GET /orders
Request Headers:
Authorization: Bearer <user_token>
```Response:
[
  {
    "id": "<order_id>",
    "amount": 1000.00,
    "description": "Let us ride",
    "status": "completed"
  }
]
```
### Get All Orders of a Carrier
GET /orders
Request Headers:
Authorization: Bearer <carrier_token>
```Response:
[
  {
    "id": "<order_id>",
    "amount": 1000.00,
    "description": "Let us ride",
    "status": "completed"
  }
]
```

## OTP
### Create OTP for an Order
POST /otps
Request Headers:
Authorization: Bearer <user_token>
Request:
```json
{
  "order_id": "<order_id>"
}
Response:
{
  "order_id": "<order_id>",
  "otp": "<otp>"
}
```
### Get OTP of a Particular Order
GET /otps/:order_id/orders
Request Headers:
Authorization: Bearer <user_token>
```Response:
{
  "order_id": "<order_id>",
  "otp": "<otp>"
}
```
### Confirm Completion of an Order
POST /otps/confirm
Request Headers:
Authorization: Bearer <carrier_token>
Request:
```json
{
  "order_id": "<order_id>",
  "otp": "<otp>"
}
Response:
{
  "order_id": "<order_id>",
 "status": "completed"
}
```

## Ratings
### Create Rating by a User
POST /ratings
Request Headers:
Authorization: Bearer <user_token>
Request:
```json
{
  "rating": 4,
  "order_id": "<order_id>"
}
Response:
{
  "id": "<rating_id>",
  "rating": 4,
  "order_id": "<order_id>",
  "user_id": "<user_id>"
}
```
### Get All Ratings by a User
GET /ratings
Request Headers:
Authorization: Bearer <user_token>
```Response:
json
[
  {
    "id": "<rating_id>",
    "rating": 4,
    "order_id": "<order_id>",
    "user_id": "<user_id>"
  }
]
```
### Update Rating by ID
PUT /ratings/:rating_id
Request Headers:
Authorization: Bearer <user_token>
Request:
```json
{
  "rating": 5.0
}
Response:
{
  "id": "<rating_id>",
  "rating": 5.0,
  "order_id": "<order_id>",
  "user_id": "<user_id>"
}
```
### Get a Particular Rating
GET /ratings/:rating_id
Request Headers:
Authorization: Bearer <user_token>
```Response:
{
  "id": "<rating_id>",
  "rating": 4,
  "order_id": "<order_id>",
  "user_id": "<user_id>"
}
```

## File Uploading
->To upload file our json must contain three keyword type(license, idcard), data, extension
POST /uploads
Request Headers:
Authorization: Bearer <carrier_token>
Request:
```json
{
  "type": "license",
  "data": <encoded file using base64 string>,
  "extension": the file extension e.g jpg
}
Response:
{
  'status': 'success',
  'path': 'localhost:3000/license_test.jpg'
}
```

The format for file retrievation is 'localhost:3000/{type}_{carrier_id}.{extension}'
The format for file retrievation is (for license) 'localhost:3000/license_{carrier_id}.jpg'
The format for file retrievation is (for idcard) 'localhost:3000/idcard_{carrier_id}.jpg'

->Download log
GET /download-log
Download prompt will pop up


->Check if a file is present on the server
GET /check-file?type=x&id=y&extension=z
where x, y, and z are values
```Response:
{
  'exists': true,
  'path': 'localhost:3000/license_test.jpg'
}
```

->Download a particular file from the server
GET /download-file?type=x&id=y&extension=z
where x, y, and z are values
```Response:
{
  'exists': true,
  'path': 'localhost:3000/license_test.jpg'
}
```

### SENDING EMAIL

POST /sendmail
Request Headers:
Authorization: Bearer <token>
Request:
```json
{
  "email": <email to sent to>,
  "head": <subject>,
  "message": <message>
}
Response:
{
  "message": "Email sent successfully"
  }
```

## Conclusion
This documentation provides an overview of the NGREEN API endpoints, including how to authenticate users, manage users and carriers, handle transactions, orders, OTPs, and ratings. Each endpoint includes a description, request headers, request, and response examples to help you integrate and use the API effectively.