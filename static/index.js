document.addEventListener('DOMContentLoaded', () => {
    // show display name if set
    if (localStorage.getItem('display-name')) {
        load_channels();
    }
    else {
        // allow user to set display name
        document.querySelector('#new-display-name').onsubmit = () => {
            display_name = document.querySelector('#display-name').value;
            localStorage.setItem('display-name', display_name);
        }
    }

    function load_channels() {
        const request = new XMLHttpRequest();
        request.open('GET', '/channels');
        request.onload = () => {
            const response = request.responseText;
            document.querySelector('body').innerHTML = response;
        }
        request.send();
    }
    
})