import os

from dotenv import load_dotenv

from flask import Flask
from flask_socketio import SocketIO, emit

load_dotenv()
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


@app.route("/")
def index():
    return "Project 2: TODO"
