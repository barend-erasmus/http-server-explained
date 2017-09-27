# HTTP Server Explained

The Hypertext Transfer Protocol (HTTP) is an application-level protocol for distributed, collaborative, hypermedia information systems. It is a generic, stateless, protocol which can be used for many tasks beyond its use for hypertext, such as name servers and distributed object management systems, through extension of its request methods, error codes and headers .

## Basic 1

HTTP is a protocol built using TCP/IP thus the first step in explaining the HTTP Server is to understand how TCP/IP works.

In the example below we have created a simple TCP/IP server in NodeJs.

```javascript
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
```

* PORT: We specify a port for our TCP/IP server to listen for incomming traffic. The largest port number is 65535. In this example we have chosen port 3000.
* ADDRESS: Machines can have multiple IP Addresses thus by specifying an specific IP Address we can listen for incomming traffic directed at this IP Address. In this example we have chosen to bind to 127.0.0.1.

The output of this code would look something like this.

```
Server started at: 127.0.0.1:3000
Connected to 127.0.0.1:56304
Connection closed
```

We can see that the server waits for TCP/IP traffic on port 3000 and address 127.0.0.1, then a client connects from 127.0.0.1 (The client is on the same machine) and port 56304. Once the client is connected, we close the connection.

## Basic 2

```javascript
// Executes when connected.
function onConnected(socket) {
  console.log(`Connected to ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', (data) => onData(socket, data));

  // Closes connection (Not needed anymore).
  // socket.destroy();
}

// Executes when bytes are received.
function onData(socket, data) {
    console.log(`Received ${data.length} bytes`);

    console.log(data.toString());

    // Closes connection.
    socket.destroy();
}
```