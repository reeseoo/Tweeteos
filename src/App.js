import React, { Component } from 'react';
import SocketClient from 'socket.io-client';
import TweeteoCard from './components/tweeteoCard'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {tweets:[]};
  }
  start(){
    var socket = new SocketClient('http://localhost:3001');
    socket.on('connect', function(){
      console.log('connected')
    });
    var _self = this;
    socket.on('event', function(data){
      var tweets = _self.state.tweets;
      tweets.push(data);
      _self.setState({
        tweets: tweets
      });
      const listItems = 
      console.log(data)
    });
    socket.on('disconnect', function(){});
  }

  render() {
    return (
      <div className="App">
        {this.start()}
        <ul>{this.state.tweets.map((tweet) =><li><TweeteoCard tweet={tweet}/></li>)}</ul>
      </div>
    );
  }
}

export default App;
