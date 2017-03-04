var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
var config = require('./config.json'); // use this one for testing
var twitter = require('twitter');
var session = require('express-session');

var twit = new twitter({
    consumer_key: process.env.twitconsumerkey || config.twitconsumerkey,
    consumer_secret: process.env.twitconsumersecret || config.twitconsumersecret,
    access_token_key: process.env.twitaccesstoken || config.twitaccesstoken,
    access_token_secret: process.env.twittokensecret || config.twittokensecret
});

var express = require('express'),
    app = express().use(express.static(__dirname + '/build'));
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 3001);
var clientRequest = "default";

app.use(session({
    secret: 'jgvjftrctrjtrxjfgxhkchc', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new TwitterStrategy({
    consumerKey     : process.env.twitconsumerkey || config.twitconsumerkey,
    consumerSecret  : process.env.twitconsumersecret || config.twitconsumersecret,
    callbackURL     : process.env.twitcallbackurl || config.twitcallbackurl,
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},function(req, token, tokenSecret, profile, done) {
    //Create a socket io room against session id
    //on connect send profile back 
    //create a twitter stream for user and post results to room.


    return done(null, {
        twitter : {
            id : String,
            token        : token,
            displayName  : profile.username,
            username     : profile.displayName
        }
    });
}));

var currentStream;

io.on('connection', function(client){
    console.log('connected with handshake: ', client.handshake.query.tweets)
    clientRequest = client.handshake.query['tweets'];
    client.on('change query', changeTweets);
});

app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
    })
);

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