import os

from dotenv import load_dotenv

from flask import Flask, jsonify, render_template
from flask_socketio import SocketIO, emit

load_dotenv()
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels_list = ['channel one', 'channel two', 'channel three']

@app.route("/")
def index():
    return render_template("base.html")

@app.route("/channels")
def channels():
    return jsonify(channels_list)
