import os

from dotenv import load_dotenv
from datetime import datetime

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit


load_dotenv()
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels_list = []
channels_messages = {}

@app.route("/")
def index():
    return render_template("base.html")

@app.route("/channels")
def channels():
    return jsonify(channels_list)

@app.route("/channels/<channel_name>")
def channel(channel_name):
    return jsonify(channels_messages[channel_name])

@socketio.on("new_channel")
def create_channel(data):
    channel_name = data['name']

    if channel_name not in channels_list:
        channels_list.append(channel_name)
        timestamp = str(datetime.now())
        channels_messages[channel_name] = {
            timestamp: {
                'timestamp': timestamp,
                'display_name': 'FlackBot',
                'message': 'Start chatting in your new channel!'
            }
        }
        emit("update_channels", channel_name, broadcast=True)

@socketio.on("new_message")
def create_message(data):
    channel = data['channel']
    timestamp = str(datetime.now())
    display_name = data['display_name']
    message = data['message']
    print(data)

    channels_messages[channel][timestamp] = {
        'timestamp': timestamp,
        'display_name': display_name,
        'message': message
    }
    emit('update_messages', channel, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
