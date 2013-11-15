var http = require('http');
var redis = require('redis');
var port = process.env.PORT || 5000;
var config = require('config');
var redis_config = config.redis;

var counter = 0;

http.createServer(function(req, res){
  console.log(req.url);
  if(req.url === '/favicon.ico'){
    res.end(''); return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  var redisClient = redis.createClient(redis_config.port, redis_config.host);
  if( redis_config.password !== '' ){
    redisClient.auth( redis_config.password );
  }
  counter++;
  redisClient.set('key1', 1,  function(){
    redisClient.get('key1', function(err, val){
      res.end(counter.toString());
      //close connection
      setTimeout(function(){
        redisClient.quit();
      }, 1000 * 60 * 10);
    });
  });
}).listen(port);

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err.stack);
});