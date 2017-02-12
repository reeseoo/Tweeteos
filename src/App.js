import React, { Component } from 'react';
import SocketClient from 'socket.io-client';
import TweeteoCard from './components/tweeteoCard'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {tweets:[],key:0, input: 'javascript'};
    this.handleChange = this.handleChange.bind(this);

    this.socket = new SocketClient('http://localhost:3001', {query:"tweets=" + this.state.input});
    this.socket.on('connect', function(){
      console.log('connected')
    });

    var _self = this;

    this.socket.on('event', function(data){
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

    this.socket.on('disconnect', function(){});
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
    if (event.target.value.length > 5) {
      this.socket.disconnect();
      this.socket = new SocketClient('http://localhost:3001', { query: "tweets=" + this.state.input });
      this.socket.on('connect', function () {
        console.log('connected')
      });

      var _self = this;

      this.socket.on('event', function (data) {
        var tweets = _self.state.tweets;

        tweets.unshift({
          key: _self.state.key + 1,
          text: data.text,
          image: data.entities.media[0].media_url
        });

        _self.setState({
          tweets: tweets.slice(0, 20),
          key: _self.state.key + 1
        });
      });

      this.socket.on('disconnect', function () { });
    }
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.input} onChange={this.handleChange}></input>
        <ul>{this.state.tweets.map((tweet) =><li key={tweet.key}><TweeteoCard tweet={tweet}/></li>)}</ul>
      </div>
    );
  }
}

export default App;
