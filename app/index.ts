import http = require('http');
import url = require('url');
import { Socket } from 'net';

let path: string = '';
const sockets: { [key: number]: Socket } = {};
let nextSocketId = 0;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const pathName = req.url ? url.parse(req.url).pathname as string : '';

    path = pathName;
    res.end(`PATH NAME: ${path}`);
});

server.on('connection', (socket) => {
    const id = nextSocketId++;
    sockets[id] = socket;
    console.log(`SOCKET ${id} Opened`);

    socket.on('close', () => {
        console.log(`SOCKET ${id} Closed`);
        delete sockets[id];

    });


    // test
});

server.on('close', () => {
    console.log('CLOSE');
});

server.on('listening', () => {
    console.log('LISTENING');
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Starting Server');
});

const killServer = () => {
    server.close(() => {
        console.log('KILL SERVER');

    });

    for (const socket in sockets) {
        console.log(`Closing socket ${socket}`);
        sockets[socket].destroy();
    }
}
// // Count down from 10 seconds
// (function countDown (counter) {
//     console.log(counter);
//     if (counter > 0)
//       return setTimeout(countDown, 1000, counter - 1);

//     // Close the server
//     server.close(function () { console.log('Server closed!'); });
//     // Destroy all open sockets
//     for (var socketId in sockets) {
//       console.log('socket', socketId, 'destroyed');
//       sockets[socketId].destroy();
//     }
//   })(10);

