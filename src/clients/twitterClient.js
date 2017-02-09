import Twitter from 'twitter';

class TwitterClient {
    getTweets() {
        var util = require('util'),
            twitter = require('twitter');

        var twit = new twitter({
            consumer_key: ENV['twitconsumerkey'],
            consumer_secret: ENV['twitconsumersecret'],
            access_token_key: ENV['twitaccesstoken'],
            access_token_secret: ENV['twittokensecret']
        });

        twit.get('search/tweets', { q: 'node.js' }, function (error, tweets, response) {
            console.log(tweets);
        });
    }
}

export default TwitterClient;