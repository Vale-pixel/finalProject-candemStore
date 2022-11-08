from flask import Flask, json, request
from flask_cors import CORS

# Declare the APP server instance
app = Flask(__name__)
# Enable CORS policies
CORS(app)

# Endpoint
@app.route("/", methods=["GET"])
def index():
  # args = request.args.to_dict()
  return json.dumps({
    "msg": "Hello Python REST API"
  })

# Execute the app instance wether is the main file
if __name__ == "__main__":
  app.run(debug=True)