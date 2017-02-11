var twitter = require('twitter');
var config = require('./config.json')

var twit = new twitter({
    consumer_key: config.twitconsumerkey,
    consumer_secret: config.twitconsumersecret,
    access_token_key: config.twitaccesstoken,
    access_token_secret: config.twittokensecret
});

twit.stream('statuses/filter', { track: 'javascript' }, function (stream) {
    stream.on('data', function (tweet) {
        console.log(tweet.text);
    });

    stream.on('error', function (error) {
        console.log(error);
    });
});

