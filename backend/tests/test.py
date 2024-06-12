#!/usr/bin/python3
"""Automated testng for the api"""
import requests
import uuid
from pprint import pprint
# import sys
# import json
# import base64

url = 'http://127.0.0.1:3000/'

#admins

admin_auth = {
    'email': f'testuser@ngreen.usr',
    'password': 'tester'
}

a_res = requests.post(url + 'auth/users', json=admin_auth)
admin_id = a_res.json().get('user').get('id')
admin_token = a_res.json().get('token')
admin_headers = {
    'Authorization': f'Bearer {admin_token}'
}

#user

usr = {
    'email': f'test{str(uuid.uuid4())}@ngreen.usr',
    'password': 'Tester1111',
    'pnumber': '07034526545',
    'fname': 'musa',
    'lname': 'musa',
}

b_res = requests.post(url + 'users', json=usr)
print("User created")
pprint(b_res.json())
user_auth =  {
    'email': usr.get('email'),
    'password': usr.get('password')
}
a_res = requests.post(url + 'auth/users', json=user_auth)
user_token = a_res.json().get('token')

user_headers = {
    'Authorization': f'Bearer {user_token}'
}

user_id = a_res.json().get('user').get('id')
usr =  {'lname': 'Mustapha'}

b_res1 = requests.put(url + 'users/' + b_res.json().get('id'), json=usr, headers=user_headers)
print("user Updated")
pprint(b_res1.json())

b_res = requests.get(url + f'users/{user_id}', headers=user_headers)
print("Get a particular user")
pprint(b_res.json())

b_res = requests.get(url + 'users', headers=user_headers)
print("Get all users")
pprint(b_res.json())

# Carriers

usr['email'] = f'test{str(uuid.uuid4())}@ngreen.usr'
usr['account_name'] = 'MUsa Mustapha'
usr['account_bank'] = 'Zenith Bank'
usr['account_name'] = 7089456123

b_res = requests.post(url + 'carriers', json=usr)
print("carrier created")
pprint(b_res.json())

carrier_auth =  {
    'email': usr.get('email'),
    'password': usr.get('password')
}
a_res = requests.post(url + 'auth/carriers', json=carrier_auth)
carrier_token = a_res.json().get('token')
carrier_headers = {
    'Authorization': f'Bearer {carrier_token}'
}

car_id = b_res.json().get('carrier').get('id')
usr =  {'fname' : 'Mumin'}

b_res = requests.put(url + f'carriers/{car_id}', json=usr, headers=carrier_headers)
print("carriers Updated")
pprint(b_res.json())

b_res = requests.get(url + f'carriers/{car_id}', headers=carrier_headers)
print("Get a particular carriers")
pprint(b_res.json())

b_res = requests.get(url + 'carriers', headers=carrier_headers)
print("Get all carriers")
pprint(b_res.json())

b_res = requests.put(url + f'carriers/{car_id}/approve', headers=admin_headers)
print("Carrier Approved")
pprint(b_res.json())

b_res = requests.get(url + 'carriers', params={'active': True, 'approved': True}, headers=carrier_headers)
print("Get Approved carriers")
pprint(b_res.json())


# wALLETS
b_res = requests.get(url + 'wallets', headers=admin_headers)
print("Get all wallets")
pprint(b_res.json())

b_res = requests.get(url + 'wallets/' + user_id + '/users', headers=admin_headers)
print("Get wallet of a particular user by admin")
pprint(b_res.json())

b_res = requests.get(url + 'wallets/current', headers=user_headers)
print("Get wallet of a particular user by user")
pprint(b_res.json())

b_res = requests.get(url + 'wallets/' + car_id + '/users', headers=admin_headers)
print("Get wallet of a particular user by admin")
pprint(b_res.json())

b_res = requests.get(url + 'wallets/current', headers=carrier_headers)
print("Get wallet of a particular carrier by admin")
pprint(b_res.json())

## Transactions

trans = {
    'amount': 1500.00,
    'description': 'Test',
    'type': 'credit'
}

b_res = requests.post(url + 'transactions', json=trans, headers=user_headers)
print("Create a transaction")
pprint(b_res.json())

b_res = requests.get(url + 'transactions', headers=user_headers)
print("GET ALL transaction")
pprint(b_res.json())

b_res = requests.get(url + 'transactions', headers=admin_headers)
print("GET ALL TRANSACIONS BY ADMIN")
pprint(b_res.json())

b_res = requests.get(url + 'transactions', headers=user_headers)
print("Get trnsaction oo a user")
pprint(b_res.json())


# Orders 

ord = {
    'amount': 1000.00,
    'description': 'Let us ride'
}

b_res = requests.post(url + 'orders', json=ord, headers=user_headers)
print("Create an Order")
pprint(b_res.json())

ord_id = b_res.json().get('id')

b_res = requests.put(url + 'orders' + ord_id, json={'carrier_id': car_id}, headers=user_headers)
print("Add A Driver")
pprint(b_res.json())

b_res = requests.get(url + 'orders', headers=admin_headers)
print("GET ALL orders")
pprint(b_res.json())

b_res = requests.get(url + 'orders', headers=user_headers)
print("GET ALL orders of a user")
pprint(b_res.json())

b_res = requests.get(url + 'orders', headers=carrier_headers)
print("GET ALL orders of a  Carrier")
pprint(b_res.json())

## OTP  
b_res = requests.post(url + 'otps', json={'order_id': ord_id}, headers=user_headers)
print("Create an Order")
pprint(b_res.json())

token = b_res.json().get('token')

b_res = requests.get(url + 'otps' + ord_id + '/otps', headers=user_headers)
print("Create an Order")
pprint(b_res.json())

b_res = requests.post(url + 'otps' + '/confirm', json={'order_id': ord_id, 'token': token}, headers=carrier_headers)
print("Confirm completion of an Order")
pprint(b_res.json())

## Ratings

rate = {
    "rating": 4.0,
    "order_id": ord_id
}

b_res = requests.post(url + 'ratings', json=rate, headers=user_headers)
print("Create an Order")
pprint(b_res.json())

rat_id = b_res.json().get('id')

b_res = requests.get(url + 'ratings',  headers=user_headers)
print("Create an Order")
pprint(b_res.json())

b_res = requests.put(url + 'ratings', json={'rating': 5.0}, headers=user_headers)
print("Create an Order")
pprint(b_res.json())

b_res = requests.get(url + 'ratings/' + rat_id, headers=user_headers)
print("Create an Order")
pprint(b_res.json())

##  wallet

b_res = requests.get(url + 'wallets/current', headers=user_headers)
print("Get wallet of a particular user by user")
pprint(b_res.json())

b_res = requests.get(url + 'transactions', headers=user_headers)
print("Get trnsaction oo a user")
pprint(b_res.json())


###Uploadproduct with image
# file_name = './test.jpg'

# file_encoded = None
# with open(file_name, "rb") as image_file:
#     file_encoded = base64.b64encode(image_file.read()).decode('utf-8')

#     pro = {
#     'name' : 'Jollof Rice',
#     'description': 'A type of Rice',
#     'carrier_id': s_id,
#     'category_id': c1_id,
#     'quantity': 30,
#     'price': 10000,
#     'data': file_encoded,
#     'extension': 'jpg'
# }
#     b_res = requests.post(url + 'products', json=pro, headers=headers)
#     print("products created with image")
#     pro1 = b_res.json()
#     pprint(b_res.json())