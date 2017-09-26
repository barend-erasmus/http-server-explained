// Imports.
const request = require('request');
request({
    method: 'POST',
    url: 'http://127.0.0.1:3000/hello/world',
    body: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    json: true,
}, (error, response, body) => {
    if (error) {
        console.log(error.message);
        return;
    }
});