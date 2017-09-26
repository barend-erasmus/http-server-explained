// Imports.
const request = require('request');

request({
    method: 'GET',
    url: 'http://127.0.0.1:3000/hello/world',
}, (error, response, body) => {
    if (error) {
        console.log(error.message);
        return;
    }
});