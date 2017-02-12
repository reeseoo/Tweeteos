import React, { Component } from 'react';
import './../App.css';

class TweeteoCard extends Component {
  render() {
    return (
      <div className="Card">
        <img src={this.props.tweet.media_url} alt="Tweet Image"/>
        {this.props.tweet.text}
      </div>
    );
  }
}

export default TweeteoCard;