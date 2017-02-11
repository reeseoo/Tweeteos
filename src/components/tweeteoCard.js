import React, { Component } from 'react';
import './../App.css';

class TweeteoCard extends Component {
  render() {
    return (
      <div className="Card">
        {this.props.tweet}
      </div>
    );
  }
}

export default TweeteoCard;