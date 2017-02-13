import React, { Component } from 'react';
import './../App.css';

class TweeteoCard extends Component {

  displayImage(tweet){
    if(tweet.image != null){
      return <div className="ImageCard"> <img src={tweet.image} alt="Tweet" style={{height: '150px', margin: 'auto'}}/> </div>
    }
  }

  displayRetweets(tweet){
    if(tweet.retweets > 0){
      return <div>{this.props.tweet.retweets}</div>
    }
  }

  render() {
    return (
      <div className="Card">
        <div>{this.displayImage(this.props.tweet)}</div>
        <div className="CardText">{this.displayRetweets(this.props.tweet)} <br/> {this.props.tweet.text}</div>
      </div>
    );
  }
}

export default TweeteoCard;