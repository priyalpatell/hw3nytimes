import pytest
from app import app
import os
from dotenv import load_dotenv
# from mongomock import MongoClient


load_dotenv(dotenv_path='../.env')

@pytest.fixture
def client():
	with app.test_client() as client:
		yield client

# tests retrieving api key
def test_get_key(client):
	response = client.get('/api/key')
	assert response.status_code == 200
	assert response.content_type == 'application/json'
	data = response.get_json()
	assert 'apiKey' in data
	assert len(data['apiKey']) > 0
	assert isinstance(data['apiKey'], str)

# @pytest.fixture
# def mock_mongo_client(mocker):
# 	mock_client = MongoClient()
# 	mocker.patch('app.MongoClient', return_value=mock_client)
# 	yield mock_client

# @pytest.fixture
# def app():
# 	app.config['TESTING'] = True
# 	yield app

# @pytest.fixture
# def client(app):
# 	return app.test_client()

# def test_get_article(client, mock_mongo_client):
# 	mock_db = mock_mongo_client.mydatabase
# 	mock_db.mycollection.insert_one({'item1': 'value1'})

# 	response = client.get('/get/article')
# 	data = response.get_json()
# 	print(data)
# 	assert response.status_code == 200