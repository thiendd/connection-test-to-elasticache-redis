var http = require('http');
var redis = require('redis');
var port = process.env.PORT || 5000;
var config = require('config');
var redis_config = config.redis;

http.createServer(function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/html' });

  var redisClient = redis.createClient(redis_config.port, redis_config.host);
  if( redis_config.password !== '' ){
    redisClient.auth( redis_config.password );
  }
  redisClient.set('key1', 1,  function(){
    redisClient.get('key1', function(err, val){
      res.end(val);
    });
  });
}).listen(port);

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err.stack);
});