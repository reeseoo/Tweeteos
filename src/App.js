import React, { Component } from 'react';
import SocketClient from 'socket.io-client';
import TweeteoCard from './components/tweeteoCard'
import ControlPanel from './components/controlPanel'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {tweets:[],key:0, input: 'cats', panelVisible: false};
    this.socket = new SocketClient(window.location.hostname, {query:"tweets=" + this.state.input});
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
  
    handleClick(event) {
    this.setState({ panelVisible: !this.state.panelVisible });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header"><h1 className="App-heading">Tweeteos</h1></div>
        <ControlPanel panelVisible={this.state.panelVisible} input={this.state.input} changeSubject={this.changeSubject} handleChange={this.handleChange} socket={this.socket}/>
        <div style={{height: "50px", width: "30px", backgroundColor:"black", position: "absolute", top: "0"}} onClick={this.handleClick.bind(this)}></div>
        <ul>{this.state.tweets.map((tweet) =><li key={tweet.key}><TweeteoCard tweet={tweet}/></li>)}</ul>
      </div>
    );
  }
}

export default App;