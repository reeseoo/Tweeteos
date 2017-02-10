import Twitter from 'twitter';
import config from '../../config'

class TwitterClient {
    getTweets() {
        var util = require('util'),
            twitter = require('twitter');

        var twit = new twitter({
            consumer_key: config.twitconsumerkey,
            consumer_secret: config.twitconsumersecret,
            access_token_key: config.twitaccesstoken,
            access_token_secret: config.twittokensecret
        });

        twit.stream('statuses/filter', { track: '#js' }, function (stream) {
            console.log(stream);
        });
    }
}

export default TwitterClient;