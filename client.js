var request = require('request');
var _ = require('underscore');

_(3000).times(function(){
  request('http://hidden-garden-4622.herokuapp.com/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("ok: ", body);
    }else{
      console.error(error);
    }
  });
});

