from flask import Flask, jsonify, send_from_directory, request, redirect, session
import os
import requests
from flask_cors import CORS
from pymongo import MongoClient
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
import urllib.parse
import json

static_path = os.getenv('STATIC_PATH','static')
template_path = os.getenv('TEMPLATE_PATH','templates')
# Mongo connection
mongo_uri = os.getenv("MONGO_URI")
mongo = MongoClient(mongo_uri)
#db = mongo.get_default_database()
db = mongo['mydatabase']
collection = db['articles']
#collection.insert_one({"test":"Testone"})

# template example
comment = {
    "user": "",
    "body": "",
    "display": True
}
comments = {
    "unique_id":"",
    "comments": [comment],
    "count": 0
}

app = Flask(__name__, static_folder=static_path, template_folder=template_path)
CORS(app)

app.secret_key = "super secret key"

CORS(app, supports_credentials=True, origins=['http://localhost:5173'])
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False  # Set True if using HTTPS


#------------- START DEX CODE---------------------

oauth = OAuth(app)

nonce = generate_token()


oauth.register(
    name=os.getenv('OIDC_CLIENT_NAME'),
    client_id=os.getenv('OIDC_CLIENT_ID'),
    client_secret=os.getenv('OIDC_CLIENT_SECRET'),
    # server_metadata_url='http://dex:5556/.well-known/openid-configuration',
    authorization_endpoint="http://localhost:5556/auth",
    token_endpoint="http://dex:5556/token",
    jwks_uri="http://dex:5556/keys",
    userinfo_endpoint="http://dex:5556/userinfo",
    device_authorization_endpoint="http://dex:5556/device/code",
    client_kwargs={'scope': 'openid email profile'}
)

# return redirect(f"http://localhost:5173?access_token={token['access_token']}")

@app.route('/')
def home():
    user = session.get('user')
    if user:
        return f"<h2>Logged in as {user['email']}</h2><a href='/logout'>Logout</a>"
    return '<a href="/login">Login with Dex</a>'

@app.route('/login')
def login():
    session['nonce'] = nonce
    redirect_uri = 'http://localhost:8000/authorize'
    return oauth.flask_app.authorize_redirect(redirect_uri, nonce=nonce)

@app.route('/authorize')
def authorize():
    token = oauth.flask_app.authorize_access_token()
    nonce = session.get('nonce')

    user_info = oauth.flask_app.parse_id_token(token, nonce=nonce)  # or use .get('userinfo').json()
    session['user'] = user_info
    print("Session set for user:", user_info['email'])

    return redirect(f'http://localhost:5173')

@app.route('/api/me')
def me():
    user = session.get('user')
    if user:
        return jsonify(user)
    return jsonify({'error': 'Unauthorized'}), 401

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

#------------- END DEX CODE---------------------

@app.route('/get_articles', methods=["GET"])
def get_articles():
    city = request.args.get("city")
    base_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"
    filters = "fq=timesTag.location.contains:" + city
    query_url = base_url + filters + "&api-key=" + os.getenv('NYT_API_KEY')
    response = requests.get(query_url)
    data = response.json()
    return jsonify(data)

@app.route('/post_comments', methods=['POST'])
def post_comments():
    data = request.get_json()
    result = collection.insert_one(data)
    return jsonify({'inserted_id': str(result.inserted_id)})

@app.route('/get_comments', methods=["GET"])
def get_comments():
    id = request.args.get("id")
    result = collection.find_one({"test": id})
    result['_id'] = str(result['_id'])
    return jsonify(result)
    
@app.route('/get_all_comments', methods=['GET'])
def get_all_comments():
    result = list(collection.find())
    for r in result:
        r['_id'] = str(r['_id'])
    return jsonify(result)

@app.route('/update_comments', methods=['PUT'])
def update_comments():
    data = request.get_json()
    result = collection.update_one(data.get("id"), data.get("change"), True)
    return jsonify({"modified_count": result.modified_count})

@app.route('/delete_comments', methods=['DELETE'])
def delete_comments():
    data = request.get_json()
    result = collection.delete_one(data)
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