import SocketIOClient from 'socket.io-client';
const host = {
    development: "http://localhost:8082",
    production: "https://brassroots-api.herokuapp.com",
}
const BASE_URL = host.production,
    socket = SocketIOClient(`${BASE_URL}`);

export default {
    socket,
}