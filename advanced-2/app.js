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

    /* The following block of code has been moved to a method.

    const bodyOfResponse = `{"success": true}`;
    const response = `HTTP/1.1 200 OK\r\ncontent-length: ${bodyOfResponse.length}\r\nconnection: close\r\n\r\n${bodyOfResponse}`;

    // Sends response.
    console.log('Sending response');
    socket.write(response);
    console.log(response);

    // Closes connection.
    socket.destroy();
    console.log('Connection closed');

    */

    sendResponse(socket, data, 200, 'OK');
}

function sendResponse(socket, data, statusCode, reasonPhrase) {

    const request = parseRequestData(data);

    let title = 'NONE';

    if (request.path === '/home') {
        title = 'Home';
    }else if (request.path === '/about') {
        title = 'About';
    }

    const bodyOfResponse = `<!DOCTYPE html><html><body><h1>${title}</h1></body></html>`;
    const response = `HTTP/1.1 ${statusCode} ${reasonPhrase}\r\ncontent-length: ${bodyOfResponse.length}\r\nconnection: close\r\n\r\n${bodyOfResponse}`;

    // Sends response.
    console.log('Sending response');
    socket.write(response);
    console.log(response);

    // Closes connection.
    socket.destroy();
    console.log('Connection closed');

}

function parseRequestData(data) {
    const splittedLines = data.toString().split('\r\n');

    const requestLine = splittedLines[0];

    const splittedRequestLine = requestLine.split(' ');

    const method = splittedRequestLine[0];
    const path = splittedRequestLine[1];
    const version = splittedLines[2];

    return {
        method,
        path,
        version,
    };
}

console.log(`Server started at: ${ADDRESS}:${PORT}`);