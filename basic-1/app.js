// Imports
const net = require('net');

// Declares port and address
const PORT = 3000;
const ADDRESS = '127.0.0.1';

// Initializes server
const server = net.createServer(onConnected);

// Starts listening on port and address
server.listen(PORT, ADDRESS);

// Executes when connected.
function onConnected(socket) {
  console.log(`Connected to ${socket.remoteAddress}:${socket.remotePort}`);

  // Closes connection
  socket.destroy();
  console.log('Connection closed');
}

console.log(`Server started at: ${ADDRESS}:${PORT}`);