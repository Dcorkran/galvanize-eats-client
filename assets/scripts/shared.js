const SERVER_URL = getServerUrl();
const CLIENT_URL = getClientUrl();

function getServerUrl() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000';
    } else {
        return 'https://galvanize-reads-dc.herokuapp.com';
    }
}

function getClientUrl() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:8080';
    } else {
        return 'https://galvanize-reads.firebaseapp.com/';
    }
}
