import os

from dotenv import load_dotenv

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit


load_dotenv()
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels_list = ['channel_one', 'channel_two', 'channel_three']
channels_messages = {
    'channel_one': {
        '2020-02-27 17:37:58.929850': {
            'display_name': 'danial',
            'message': 'i fink you freaky'
        }
    },
    'channel_two': {
        '2020-02-27 17:37:58.929850': {
            'display_name': 'danial',
            'message': 'Where are we?'
        },
        '2020-02-27 17:38:58.929850': {
            'display_name': 'Chip',
            'message': 'at milhaus'
        }
    },
    'channel_three': {}
}

@app.route("/")
def index():
    return render_template("base.html")

@app.route("/channels")
def channels():
    return jsonify(channels_list)

@app.route("/channels/<channel_name>")
def channel(channel_name):
    return jsonify(channels_messages['channel_name'])

@socketio.on("new_channel")
def create_channel(data):
    channel_name = data['name']

    if channel_name not in channels_list:
        channels_list.append(channel_name)
        emit("update_channels", channel_name, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)