import React, { Component } from 'react';
import SocketClient from 'socket.io-client';
import TweeteoCard from './components/tweeteoCard'
import {debounce} from 'throttle-debounce';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.changeSubject = debounce(750,this.changeSubject);
    this.state = {tweets:[],key:0, input: 'cats'};
    this.socket = new SocketClient('http://localhost:3001', {query:"tweets=" + this.state.input});
    this.socket.on('connect', function(){
      console.log('connected')
    });

    var _self = this;

    this.socket.on('event', (data)=>{
      var tweets = _self.state.tweets;
      var duplicate = false;

      for(var i = 0; i < tweets.length; i++){
          if(data.retweeted_status && data.retweeted_status.text.indexOf(tweets[i].text) !== -1){
            duplicate = true;
            tweets[i].retweets++;
            _self.setState({
              tweets: tweets.slice(0, 12),
              key: _self.state.key + 1,
            });
        }
      }

      if (!duplicate) {
        tweets.unshift({
          key: _self.state.key + 1,
          text: data.text,
          retweets: 0,
          image: data.extended_entities ? data.entities.media[0].media_url : null
        });

        _self.setState({
          tweets: tweets.slice(0, 12),
          key: _self.state.key + 1,
        });
      }
    });

    this.socket.on('disconnect', function(){});
  }

  handleChange(event) {
    this.setState({ input: event.target.value.trim() });
  }
  
  changeSubject() {
    if(this.state.input !== this.state.lastInput)
    {
      this.socket.emit('change query',this.state.input);
      this.setState({ lastInput: this.state.input });
    } 
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.input} onChange={this.handleChange.bind(this)} onKeyUp={this.changeSubject.bind(this)}></input>
        <ul>{this.state.tweets.map((tweet) =><li key={tweet.key}><TweeteoCard tweet={tweet}/></li>)}</ul>
      </div>
    );
  }
}

export default App;