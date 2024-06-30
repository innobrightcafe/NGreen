#!/usr/bin/python3
import base64
import requests
from pprint import pprint

url = "http://localhost:3000/"



file_name = './test.jpg'

file_encoded = None
with open(file_name, "rb") as image_file:
    file_encoded = base64.b64encode(image_file.read()).decode('utf-8')

r_json = {'id': 'test', 'data': file_encoded, 'extension': 'jpg', 'type': 'idcard' }


r = requests.post(url + 'upload', json=r_json)
print(r.json())
