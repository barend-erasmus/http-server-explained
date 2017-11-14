const readline = require('readline');
const dns = require('dns');
const net = require('net');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


run();

async function run() {

    const hostname = await ask('Enter the hostname: ');

    console.log(`Trying to resolve the IP Address of ${hostname}`);
    await wait();

    const addresses = await dnsLookup(hostname);
    console.log(`Found: ${addresses[0]}`);

    const port = await ask('Enter the port(80): ');

    console.log(`Connecting to ${addresses[0]} on port ${port ? port : '80'}`);
    await wait();

    const socket = new net.Socket();

    await socketConnect(socket, addresses[0], port ? parseInt(port) : 80);

    let run = true;

    socket.on('data', (data) => {
        console.log('Receiving data:');
        console.log(data.toString());
    });

    socket.on('close', function () {
        console.log('Connection closed');
        run = false;
        socket.destroy();
    });

    while (run) {
        const data = await ask('Send: ');

        if (run) {
            socket.write(`${data}\r\n`);
        }
    }

    readlineInterface.close();
}



function ask(text) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(text, resolve);
    });
}

function dnsLookup(hostname) {
    return new Promise((resolve, reject) => {
        dns.resolve4(hostname, (err, addresses) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(addresses);
        });
    })
}

function socketConnect(socket, address, port) {
    return new Promise((resolve, reject) => {
        socket.connect(port, address, () => {
            console.log(`Connected to ${address} on local port ${socket.localPort}`);
            resolve();
        });
    })
}


function wait() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}