import React, { Component } from 'react';
import './../App.css';

class TweeteoCard extends Component {

  displayImage(tweet){
    if(tweet.image != null){
      return <div className="ImageCard"> <img src={tweet.image} alt="Tweet" style={{height: '125px', margin: 'auto', maxWidth: '100%'}}/> </div>
    }
  }

  displayRetweets(tweet){
    if(tweet.retweets > 0){
      return <div>{this.props.tweet.retweets}</div>
    }
  }

  cardSwitcher(tweet){
    if(tweet.image != null){
        return <div><div>{this.displayImage(tweet)}</div>
        <div className="CardText">{this.displayRetweets(tweet)} <br/> {tweet.text}</div></div>
    }else{
        return <div className="CardTextTwo">{this.displayRetweets(tweet)} <br/> {tweet.text}</div>
    }
  }

  render() {
    return (
      <div className="Card">
        {this.cardSwitcher(this.props.tweet)}
      </div>
    );
  }
}

export default TweeteoCard;