import React, { Component } from 'react';
import TwitterClient from './clients/twitterClient';
import './App.css';

class App extends Component {
  start(){
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
