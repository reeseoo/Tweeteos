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
var clientRequest = "default";

io.on('connection', function(client){
  clientRequest = client.handshake.query['tweets'];
  setStream();
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

server.listen(3001);

function setStream(){
    twit.stream('statuses/filter', { track: clientRequest }, function (stream) {
    console.log(`getting tweets for ${clientRequest}`)
    stream.on('data', function (tweet) {
        io.emit("event",tweet);
    });

    stream.on('error', function (error) {
        console.log(error);
    });
});
}