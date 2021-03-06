// Imports.
const net = require('net');

// Declares port and address.
const PORT = 3000;
const ADDRESS = '127.0.0.1';

// Initializes server.
const server = net.createServer(onConnected);

// Starts listening on port and address.
server.listen(PORT, ADDRESS);

// Executes when connected.
function onConnected(socket) {
  console.log(`Connected to ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', (data) => onData(socket, data));

  // Closes connection (Not needed anymore).
  // socket.destroy();
  // console.log('Connection closed');
}

// Executes when bytes are received.
function onData(socket, data) {
    console.log(`Received ${data.length} bytes`);

    console.log(data.toString());

    // Closes connection.
    socket.destroy();
    console.log('Connection closed');
}

console.log(`Server started at: ${ADDRESS}:${PORT}`);