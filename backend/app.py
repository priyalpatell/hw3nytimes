from flask import Flask, jsonify, send_from_directory, request
import os
from flask_cors import CORS
from pymongo import MongoClient

static_path = os.getenv('STATIC_PATH','static')
template_path = os.getenv('TEMPLATE_PATH','templates')
# Mongo connection
mongo_uri = os.getenv("MONGO_URI")
mongo = MongoClient(mongo_uri)
#db = mongo.get_default_database()
db = mongo['mydatabase']
collection = db['articles']
#collection.insert_one({"test":"Testone"})

comments = {
    "unique_id":"",
    "comments": [
    ],
    "count": 0
}
comment = {
    "user": "",
    "body": "",
    "display": True
}

app = Flask(__name__, static_folder=static_path, template_folder=template_path)
CORS(app)

@app.route('/post_comments', methods=['POST'])
def post_article():
    data = request.get_json()
    result = collection.insert_one(data)
    return jsonify({'inserted_id': str(result.inserted_id)})

@app.route('/get_comments', methods=["GET"])
def get_article():
    id = request.args.get("id")
    result = collection.find_one({"test": id})
    result['_id'] = str(result['_id'])
    return jsonify(result)
    
@app.route('/get_all_comments', methods=['GET'])
def get_all_articles():
    result = list(collection.find())
    for r in result:
        r['_id'] = str(r['_id'])
    return jsonify(result)

@app.route('/update_comments', methods=['PUT'])
def update_article():
    data = request.get_json()
    result = collection.update_one(data.id, data.change)
    return jsonify({"modified_count": result.modified_count})

@app.route('/delete_comments', methods=['DELETE'])
def delete_article(id):
    result = collection.delete_one(id)
    return jsonify({"deleted_count": result.deleted_count})


@app.route('/api/key')
def get_key():
    return jsonify({'apiKey': os.getenv('NYT_API_KEY')})

@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=''):
    if path != '' and os.path.exists(os.path.join(static_path,path)):
        return send_from_directory(static_path, path)
    return send_from_directory(template_path, 'index.html')

@app.route("/test-mongo")
def test_mongo():
    return jsonify({"collections": db.list_collection_names()})

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_ENV') != 'production'
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)),debug=debug_mode)