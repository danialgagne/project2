# Project 2 - Online Messaging Service

Web Programming with Python and JavaScript

Flack is an online messaging service using Flask, similar in spirit to Slack. Users can sign in with a display name, create channels (i.e. chatrooms) to communicate in, as well as see and join existing channels. Once a channel is selected, users will be able to send and receive messages with one another in real time.

## Getting Started

To clone and run this application, you'll need [Git](https://git-scm.com), [Pip](https://pip.pypa.io/en/stable/installing/), and [Python](https://www.python.org/) version 3.7 (or higher) installed.

## Installing

To start, clone the repository and set up your environment with the required dependencies from the `requirements.txt` file.

```bash
# Clone this repository
$ git clone https://github.com/danialgagne/project2.git

# Go into the repository
$ cd project2

# Install the dependencies
$ pip install -r requirements.txt
```

You'll need to copy and rename the `.env.sample` file to `.env` with the following environment variables set:

```
FLASK_APP=application.py
```

The app is now ready to run. Because Flask-SocketIO no longer supports the `flask run` command ([outstanding issue](https://github.com/miguelgrinberg/Flask-SocketIO/issues/894)), the following must be used to run the app:

```bash
# run your flask server
$ python application.py
```