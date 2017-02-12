import React, { Component } from 'react';
import './../App.css';

class TweeteoCard extends Component {

  displayImage(tweet){
    if(tweet.image != null){
      //return <div style={{backgroundImage: '${tweet.image}', height: '200px', width: '150px'}}></div>
      return <img src={tweet.image} alt="Tweet Image" style={{height: '100px', width: '20%'}}/>
    }
  }

  render() {
    return (
      <div className="Card">
        <div className="ImageCard">{this.displayImage(this.props.tweet)}</div>
        <div >{this.props.tweet.text}</div>
      </div>
    );
  }
}

export default TweeteoCard;