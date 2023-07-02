from flask import Flask
from server import loadModel
from flask import request

app = Flask(__name__)

model = loadModel()

@app.route("/api/home", methods=["GET"])
def home():
  return "Hello World", 200

@app.route("/api/gen-comment", methods=["POST"])
def generate_comment():
  print(request.form)
  code = request.form.get("code")
  if code is None:
      return "Invalid request. 'code' parameter is missing.", 400
  return model.generate_comment(code)[0], 200

# if __name__ == '__main__':
#   app.run(host='127.0.0.1') # allow front-end to call