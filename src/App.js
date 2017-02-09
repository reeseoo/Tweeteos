import React, { Component } from 'react';
import TwitterClient from './clients/twitterClient';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  start(){
    debugger;
    var twitterClient = new TwitterClient();
    twitterClient.getTweets();
  }

  render() {
    return (
      <div className="App">
        {this.start()}
      </div>
    );
  }
}

export default App;
