import React, { Component } from 'react';
import SocketClient from 'socket.io-client';
import TweeteoCard from './components/tweeteoCard'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {tweets:[],key:0};

    var socket = new SocketClient('http://localhost:3001', {query:"tweets=javascript"});
    socket.on('connect', function(){
      console.log('connected')
    });

    var _self = this;

    socket.on('event', function(data){
      debugger;
      var tweets = _self.state.tweets;

      tweets.unshift({
        key:_self.state.key+1,
        text:data.text,
        image: data.entities.media[0].media_url
      });

      _self.setState({
        tweets: tweets.slice(0,20),
        key:_self.state.key+1
      });
    });

    socket.on('disconnect', function(){});
  }
  start(){
    
  }

  render() {
    return (
      <div className="App">
        {this.start()}
        <ul>{this.state.tweets.map((tweet) =><li key={tweet.key}><TweeteoCard tweet={tweet}/></li>)}</ul>
      </div>
    );
  }
}

export default App;
