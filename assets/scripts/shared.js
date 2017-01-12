const SERVER_URL = getServerUrl();

function getServerUrl() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000';
    } else {
        return 'poop';
    }
}
