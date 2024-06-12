import requests

# Test endpoint 1
def test_endpoint1():
    response = requests.get('http://localhost:8000/endpoint1')
    assert response.status_code == 200
    # Add more assertions to validate the response data if needed

# Test endpoint 2
def test_endpoint2():
    response = requests.post('http://localhost:8000/endpoint2', json={'data': 'example'})
    assert response.status_code == 201
    # Add more assertions to validate the response data if needed

# Test endpoint 3
def test_endpoint3():
    response = requests.put('http://localhost:8000/endpoint3', json={'data': 'example'})
    assert response.status_code == 200
    # Add more assertions to validate the response data if needed

# Test endpoint 4
def test_endpoint4():
    response = requests.delete('http://localhost:8000/endpoint4')
    assert response.status_code == 204
    # Add more assertions to validate the response data if needed

# Run all the tests
def run_tests():
    test_endpoint1()
    test_endpoint2()
    test_endpoint3()
    test_endpoint4()

# Call the run_tests function to execute all the tests
run_tests()