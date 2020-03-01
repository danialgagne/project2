document.addEventListener('DOMContentLoaded', () => {
    // show display name if set
    if (localStorage.getItem('display-name')) {
        document.querySelector('#new-display-name').remove();
        load_channels();

        document.addEventListener('click', event => {
            const element = event.target
            if (element.className === 'nav-link') {
                let channel_name = element.id
                document.querySelectorAll(".message-block").forEach( block => {
                    block.remove();
                });
                localStorage.setItem('current_channel', channel_name);
                load_messages(channel_name);
            }
        });

        // connect to websocket
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

        // when connected, configure new channel form
        socket.on('connect', () => {
            document.querySelector('#new-channel-name').onsubmit = () => {
                const new_channel_name = document.querySelector('#channel-name').value;
                socket.emit('new_channel', {'name': new_channel_name});
                document.querySelector('#channel-name').value = '';
                return false;
            };

            document.querySelector('#message-input').onkeypress = function (e) {
                if (e.which == 13 && !e.shiftKey) {
                    const message_text = this.value;
                    socket.emit('new_message', {
                        'display_name': localStorage.getItem('display_name'),
                        'message': message_text,
                        'channel': localStorage.getItem('current_channel')
                    });
                    this.value = '';
                    e.preventDefault();
                };
            };
        });

        // show new channels when added
        socket.on('update_channels', name => {
            add_channel(name);
        });
    }
    else {
        // allow user to set display name
        document.querySelector('#new-display-name').onsubmit = () => {
            const display_name = document.querySelector('#display-name').value;
            localStorage.setItem('display-name', display_name);
        };
    };
});

// request a list of channels
function load_channels() {
    const request = new XMLHttpRequest();
    request.open('GET', '/channels');
    request.onload = () => {
        const data =  JSON.parse(request.responseText);
        data.forEach(add_channel);
    };
    request.send();
};

const channel_template = Handlebars.compile(document.querySelector('#channel').innerHTML);

// create the channels on the front end
function add_channel(contents) {
    const channel = channel_template({'contents': contents});
    document.querySelector('#channels').innerHTML += channel;
};

// request a list of messages
function load_messages(channel_name) {
    const request = new XMLHttpRequest();
    request.open('GET', `/channels/${channel_name}`);
    request.onload = () => {
        const data = JSON.parse(request.responseText);
        let keys = Object.keys(data).sort();
        keys.forEach(key => {
            add_message(data[key]);
        });
    };
    request.send();
};

const message_template = Handlebars.compile(document.querySelector('#message').innerHTML)

// create messages on front end
function add_message(contents) {
    const local_time = new Date(contents['timestamp']);
    const message = message_template({
        'time': local_time,
        'display_name': contents['display_name'],
        'message': contents['message']
    });
    document.querySelector('#messages').innerHTML += message;
};