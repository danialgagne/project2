document.addEventListener('DOMContentLoaded', () => {
    // show display name if set
    if (localStorage.getItem('display-name')) {
        document.querySelector('#new-display-name').remove() 
        load_channels();
    }
    else {
        // allow user to set display name
        document.querySelector('#new-display-name').onsubmit = () => {
            display_name = document.querySelector('#display-name').value;
            localStorage.setItem('display-name', display_name);
        }
    }

    // call back end
    function load_channels() {
        const request = new XMLHttpRequest();
        request.open('GET', '/channels');
        request.onload = () => {
            const data =  JSON.parse(request.responseText);
            data.forEach(add_channel);
        }
        request.send();
    }

    const channel_template = Handlebars.compile(document.querySelector('#channel').innerHTML);

    function add_channel(contents) {
        const channel = channel_template({'contents': contents});
        document.querySelector('#channels').innerHTML += channel;
    }
})