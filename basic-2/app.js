// Imports
const net = require('net');

const PORT = 3000;
const ADDRESS = '127.0.0.1';

const server = net.createServer(onConnected);
server.listen(PORT, ADDRESS);

function onConnected(socket) {
    console.log(`Connected to ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (data) => onData(socket, data));
}

function onData(socket, data) {
    console.log(data.toString());
}

console.log(`Server started at: ${ADDRESS}:${PORT}`);