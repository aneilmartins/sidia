import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TweetCard from './TweetCard/TweetCard';

class TweetsList extends React.Component {
  constructor(props) {
    super(props);
  }

  convertDate = (date) => {
    date.slice(0, 10);
  }

  renderCorrectProfilePage = (tweet_id) => {
    const id = this.props.auth.user.id

    if (id !== tweet_id) {
      return `/profile/${tweet_id}`;
    } else {
      return `/my-profile/${id}`
    }
  }

  renderTweets = () => {
    if (this.props.data) {
      return (
        this.props.data.map((tweet) => {
          const d = new Date(tweet.createdAt);
          return (
            <TweetCard {...tweet} key={tweet._id}/>
            // <div className="tweet-container" key={tweet._id}>
            //   <div>
            //     <span className="tweet-user-name"><Link to={this.renderCorrectProfilePage(tweet.user_id)}>{tweet.user_name}</Link></span>
            //   </div>
            //   <b>{tweet.text}</b><br />
            //   Tweeted at: {d.toString().slice(0, 15)}
            // </div>
          );
        })
      )
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className={this.props.class}>
        <h1>Tweets</h1>
        {data ? this.renderTweets() : null}
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(TweetsList);