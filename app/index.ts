import http = require('http');

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    res.statusCode = 200;
    res.end('Work you');
});

server.listen(3000, '127.0.0.1', () => {
    console.log('woooorrrk 2');

});

