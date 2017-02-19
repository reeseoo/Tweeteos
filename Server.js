var twitter = require('twitter');
//var config = require('./src/config.json')

var twit = new twitter({
    consumer_key: process.env.twitconsumerkey,
    consumer_secret: process.env.twitconsumersecret,
    access_token_key: process.env.twitaccesstoken,
    access_token_secret: process.env.twittokensecret
});

var express = require('express'),
    app = express().use(express.static('/build'));
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 3001);
var clientRequest = "default";

var currentStream;

io.on('connection', function(client){
    console.log('connected with handshake: ', client.handshake.query.tweets)
    clientRequest = client.handshake.query['tweets'];
    changeTweets(clientRequest||'twitter')
    client.on('change query', changeTweets);
});

function changeTweets(data){
    console.log('changing tweets to: ',data);
    try{
        if(currentStream)
            currentStream.destroy();
        currentStream = twit.stream('statuses/filter', {track: data});
        currentStream.on('data', (tweet) => {
            io.emit("event",tweet);
        });
        currentStream.on('error', (error) => {
            console.log(error);
        });
        currentStream.on('end', (error) => {
            console.log("stream ended");
        });
    }
    catch(exc){
        console.log('failed to change tweets ',exc);
    }
}