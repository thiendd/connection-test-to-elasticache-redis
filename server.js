var http = require('http');
var redis = require('hiredis');

http.createServer(function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('hello');
}).listen(8080);