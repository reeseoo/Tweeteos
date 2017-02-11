var twitter = require('twitter');
var config = require('./src/config.json')

var twit = new twitter({
    consumer_key: config.twitconsumerkey,
    consumer_secret: config.twitconsumersecret,
    access_token_key: config.twitaccesstoken,
    access_token_secret: config.twittokensecret
});


var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

twit.stream('statuses/filter', { track: 'saturdaykitchen' }, function (stream) {
    stream.on('data', function (tweet) {
        console.log(tweet.text);
        io.emit("event",tweet.text);
    });

    stream.on('error', function (error) {
        console.log(error);
    });
});

server.listen(3001);