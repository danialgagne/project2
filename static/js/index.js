document.addEventListener('DOMContentLoaded', () => {
    // show display name if set
    if (localStorage.getItem('display-name')) {
        document.querySelector('#new-display-name').remove();
        load_channels();

        // connect to websocket
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

        // when connected, configure new channel form
        socket.on('connect', () => {
            document.querySelector('#new-channel-name').onsubmit = () => {
                new_channel_name = document.querySelector('#channel-name').value;
                socket.emit('new_channel', {'name': new_channel_name});
                return false;
            };
        });

        // show new channels when added
        socket.on('update_channels', name => {
            add_channel(name);
        })
    }
    else {
        // allow user to set display name
        document.querySelector('#new-display-name').onsubmit = () => {
            display_name = document.querySelector('#display-name').value;
            localStorage.setItem('display-name', display_name);
        };
    };

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
});