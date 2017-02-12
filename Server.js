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

var currentStream;

io.on('connection', function(client){
    console.log('connected with handshake: ', client.handshake.query.tweets)
    clientRequest = client.handshake.query['tweets'];
    changeTweets(clientRequest||'twitter')
    client.on('change query', changeTweets);
});

server.listen(3001);

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