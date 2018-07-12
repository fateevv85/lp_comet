let http = require('http');
let serverStatic = require('node-static');
const WS = require('ws').Server;

let clientsNow = {};

let WSServer = new WS({
  port: 8081
});

WSServer.on('connection', function (ws) {
  let idUser = Math.random();
  clientsNow[idUser] = ws;
  console.log('New user', 'id: ', idUser);

  ws.on('message', function (messageText) {
    console.log('New message', 'text: ', messageText);
    for (let keyClient in clientsNow) {
      clientsNow[keyClient].send(messageText);
    }
  });

  ws.on('close', function () {
    delete clientsNow[idUser];
  });
});

var myServer = new serverStatic.Server('.');

http.createServer(function (req, res) {
  myServer.serve(req, res);
}).listen(8080);

console.log('server running');
