import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TweetCard from '../tweets/TweetCard/TweetCard';

class ProfileTweets extends React.Component {
  
  convertDate = (date) => {
    date.slice(0,10);
  }

  renderCorrectProfilePage = (tweet_id) => {
    const id = this.props.auth.user.id
    
    if(id !== tweet_id) {
      return `/profile/${tweet_id}`;
    }  else {
      return `/my-profile/${id}`
    }
  }

  renderTweets = () => {
    if(this.props.tweets.getTweetsByUser) {
      return (
        this.props.tweets.getTweetsByUser.map((tweet) => {
          const d = new Date(tweet.created_at);
          return (
            <TweetCard {...tweet} key={tweet._id}/>
            // <div className="tweet-container" key={tweet._id}>
            //   <div>
            //     <span className="tweet-user-name" onClick={() => this.props.fetchTweets(tweet.user_id)}><Link to={this.renderCorrectProfilePage(tweet.user_id)}>{tweet.user_name}</Link></span>
            //   </div>
            //   <b>{tweet.tweet_text}</b><br />
            //   Tweeted at: {d.toString().slice(0,15)}
            // </div>
          );
        })
      )
    }
  }

  render() {
    const isLoading = this.props.tweets.loading;

    if(isLoading) {
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <div className={this.props.class}>
          <h1>{this.props.user ? `${this.props.user.username}'s` : "User"} Tweets</h1>
            {this.props.tweets ? this.renderTweets() : null}
        </div>
      );
    }
    
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(ProfileTweets);
