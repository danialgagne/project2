document.addEventListener('DOMContentLoaded', () => {
    // show display name if set
    if (localStorage.getItem('display-name')) {
        document.querySelector('body').innerHTML = `Hello, ${localStorage.getItem('display-name')}`
    }
    else {
        // allow user to set display name
        document.querySelector('#new-display-name').onsubmit = () => {
            display_name = document.querySelector('#display-name').value;
            localStorage.setItem('display-name', display_name);
        }
    }
})