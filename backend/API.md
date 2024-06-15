# NGREEN API Documentation

## Introduction

This document provides a comprehensive guide to using the NGREEN API. The API allows interaction with users, carriers, wallets, transactions, orders, OTPs, and ratings. This guide will cover the available endpoints, their purposes, and how to use them effectively.

## Base URL

The base URL for all API endpoints is: http://127.0.0.1:3000/

## Authentication

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
  "lname": "Mustapha"
}
Response:
{
  "id": "<user_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Musa",
  "lname": "Mustapha"
}
```
### Get User
GET /users/:user_id
Request Headers:



Authorization: Bearer <user_token>
Response:

json

{
  "id": "<user_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Musa",
  "lname": "Musa"
}
Get All Users
Endpoint:



GET /users
Request Headers:



Authorization: Bearer <user_token>
Response:

json

[
  {
    "id": "<user_id>",
    "email": "test@ngreen.usr",
    "pnumber": "07034526545",
    "fname": "Musa",
    "lname": "Musa"
  }
]
Carriers
Create Carrier
Endpoint:



POST /carriers
Request:

json

{
  "email": "test@ngreen.usr",
  "password": "Tester1111",
  "pnumber": "07034526545",
  "fname": "Musa",
  "lname": "Mustapha",
  "account_name": "Musa Mustapha",
  "account_bank": "Zenith Bank",
  "account_number": 7089456123
}
Response:

json

{
  "id": "<carrier_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Musa",
  "lname": "Mustapha",
  "account_name": "Musa Mustapha",
  "account_bank": "Zenith Bank",
  "account_number": 7089456123
}
Update Carrier
Endpoint:



PUT /carriers/:carrier_id
Request Headers:



Authorization: Bearer <carrier_token>
Request:

json

{
  "fname": "Mumin"
}
Response:

json

{
  "id": "<carrier_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Mumin",
  "lname": "Mustapha"
}
Get Carrier
Endpoint:



GET /carriers/:carrier_id
Request Headers:



Authorization: Bearer <carrier_token>
Response:

json

{
  "id": "<carrier_id>",
  "email": "test@ngreen.usr",
  "pnumber": "07034526545",
  "fname": "Mumin",
  "lname": "Mustapha"
}
Get All Carriers
Endpoint:



GET /carriers
Request Headers:



Authorization: Bearer <carrier_token>
Response:

json

[
  {
    "id": "<carrier_id>",
    "email": "test@ngreen.usr",
    "pnumber": "07034526545",
    "fname": "Mumin",
    "lname": "Mustapha"
  }
]
Approve Carrier
Endpoint:

ruby

PUT /carriers/:carrier_id/approve
Request Headers:



Authorization: Bearer <admin_token>
Response:

json

{
  "id": "<carrier_id>",
  "status": "approved"
}
Get Approved Carriers
Endpoint:



GET /carriers?active=1&approved=1
Request Headers:



Authorization: Bearer <carrier_token>
Response:

json

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
Wallets
Get All Wallets
Endpoint:



GET /wallets
Request Headers:



Authorization: Bearer <admin_token>
Response:

json

[
  {
    "id": "<wallet_id>",
    "balance": 1000.00,
    "user_id": "<user_id>"
  }
]
Get Wallet of a User by Admin
Endpoint:

ruby

GET /wallets/:user_id/users
Request Headers:



Authorization: Bearer <admin_token>
Response:

json

{
  "id": "<wallet_id>",
  "balance": 1000.00,
  "user_id": "<user_id>"
}
Get Wallet of Current User
Endpoint:

sql

GET /wallets/current
Request Headers:



Authorization: Bearer <user_token>
Response:

json

{
  "id": "<wallet_id>",
  "balance": 1000.00,
  "user_id": "<user_id>"
}
Transactions
Create Transaction
Endpoint:



POST /transactions
Request Headers:



Authorization: Bearer <user_token>
Request:

json

{
  "amount": 1500.00,
  "description": "Test",
  "type": "credit"
}
Response:

json

{
  "id": "<transaction_id>",
  "amount": 1500.00,
  "description": "Test",
  "type": "credit",
  "status": "pending"
}
Get All Transactions of a User
Endpoint:



GET /transactions
Request Headers:



Authorization: Bearer <user_token>
Response:

json

[
  {
    "id": "<transaction_id>",
    "amount": 1500.00,
    "description": "Test",
    "type": "credit",
    "status": "completed"
  }
]
Get All Transactions by Admin
Endpoint:



GET /transactions
Request Headers:



Authorization: Bearer <admin_token>
Response:

json

[
  {
    "id": "<transaction_id>",
    "amount": 1500.00,
    "description": "Test",
    "type": "credit",
    "status": "completed"
  }
]
Get Transaction by ID
Endpoint:



GET /transactions/:transaction_id
Request Headers:



Authorization: Bearer <user_token>
Response:

json

{
  "id": "<transaction_id>",
  "amount": 1500.00,
  "description": "Test",
  "type": "credit",
  "status": "completed"
}
Orders
Create Order
Endpoint:



POST /orders
Request Headers:



Authorization: Bearer <user_token>
Request:

json

{
  "amount": 1000.00,
  "description": "Let us ride"
}
Response:

json

{
  "id": "<order_id>",
  "amount": 1000.00,
  "description": "Let us ride",
  "status": "pending"
}
Add Carrier to Order
Endpoint:



PUT /orders/:order_id
Request Headers:



Authorization: Bearer <user_token>
Request:

json

{
  "carrier_id": "<carrier_id>"
}
Response:

json

{
  "id": "<order_id>",
  "amount": 1000.00,
  "description": "Let us ride",
  "carrier_id": "<carrier_id>",
  "status": "assigned"
}
Get All Orders by Admin
Endpoint:



GET /orders
Request Headers:



Authorization: Bearer <admin_token>
Response:

json

[
  {
    "id": "<order_id>",
    "amount": 1000.00,
    "description": "Let us ride",
    "status": "completed"
  }
]
Get All Orders of a User
Endpoint:



GET /orders
Request Headers:



Authorization: Bearer <user_token>
Response:

json

[
  {
    "id": "<order_id>",
    "amount": 1000.00,
    "description": "Let us ride",
    "status": "completed"
  }
]
Get All Orders of a Carrier
Endpoint:



GET /orders
Request Headers:



Authorization: Bearer <carrier_token>
Response:

json

[
  {
    "id": "<order_id>",
    "amount": 1000.00,
    "description": "Let us ride",
    "status": "completed"
  }
]
OTP
Create OTP for an Order
Endpoint:



POST /otps
Request Headers:



Authorization: Bearer <user_token>
Request:

json

{
  "order_id": "<order_id>"
}
Response:

json

{
  "order_id": "<order_id>",
  "otp": "<otp>"
}
Get OTP of a Particular Order
Endpoint:

ruby

GET /otps/:order_id/orders
Request Headers:



Authorization: Bearer <user_token>
Response:

json

{
  "order_id": "<order_id>",
  "otp": "<otp>"
}
Confirm Completion of an Order
Endpoint:



POST /otps/confirm
Request Headers:



Authorization: Bearer <carrier_token>
Request:

json

{
  "order_id": "<order_id>",
  "otp": "<otp>"
}
Response:

json

{
  "order_id": "<order_id>",
  "status": "completed"
}
Ratings
Create Rating by a User
Endpoint:



POST /ratings
Request Headers:



Authorization: Bearer <user_token>
Request:

json

{
  "rating": 4,
  "order_id": "<order_id>"
}
Response:

json

{
  "id": "<rating_id>",
  "rating": 4,
  "order_id": "<order_id>",
  "user_id": "<user_id>"
}
Get All Ratings by a User
Endpoint:



GET /ratings
Request Headers:



Authorization: Bearer <user_token>
Response:

json

[
  {
    "id": "<rating_id>",
    "rating": 4,
    "order_id": "<order_id>",
    "user_id": "<user_id>"
  }
]
Update Rating by ID
Endpoint:



PUT /ratings/:rating_id
Request Headers:



Authorization: Bearer <user_token>
Request:

json

{
  "rating": 5.0
}
Response:

json

{
  "id": "<rating_id>",
  "rating": 5.0,
  "order_id": "<order_id>",
  "user_id": "<user_id>"
}
Get a Particular Rating
Endpoint:



GET /ratings/:rating_id
Request Headers:



Authorization: Bearer <user_token>
Response:

json

{
  "id": "<rating_id>",
  "rating": 4,
  "order_id": "<order_id>",
  "user_id": "<user_id>"
}
Conclusion
This documentation provides an overview of the NGREEN API endpoints, including how to authenticate users, manage users and carriers, handle transactions, orders, OTPs, and ratings. Each endpoint includes a description, request headers, request, and response examples to help you integrate and use the API effectively.