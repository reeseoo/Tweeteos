import Twitter from 'twitter';
import config from '../config'

class TwitterClient {
    getTweets() {
        var util = require('util'),
            twitter = require('twitter');

        var twit = new twitter({
            consumer_key: config.twitaccesstoken,
            consumer_secret: config.twitconsumerkey,
            access_token_key: config.twitconsumersecret,
            access_token_secret: config.twittokensecret
        });

        twit.get('search/tweets', { q: 'node.js' }, function (error, tweets, response) {
            console.log(tweets);
        });
    }
}

export default TwitterClient;