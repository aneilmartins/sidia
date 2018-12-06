import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TweetForm from './TweetForm';
import TweetsList from './TweetsList';

import { graphql, compose, withApollo } from 'react-apollo';

import { getUserInfo } from '../../actions/profileActions';

import GET_TWEETS_QUERY from '../../graphql/queries/getTweets';
import ME_QUERY from '../../graphql/queries/me';
import TWEET_ADDED_SUBSCRIPTION from '../../graphql/subscriptions/tweetAdded';
import TWEET_FAVORITED_SUBSCRIPTION from '../../graphql/subscriptions/tweetFavorited';


class HomePage extends React.Component {

  componentWillMount() {
    try {
      this.props.data.subscribeToMore({
        document: TWEET_ADDED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newTweetFeed = subscriptionData.data.tweetAdded;

          if (!prev.getTweets.find(t => t._id === newTweetFeed._id)) {
            // adiciona no inicio
            return {
              ...prev,
              getTweets: [{ ...newTweetFeed }, ...prev.getTweets],
            };
          }

          return prev;
        },
      });
    } catch (err) {
      console.log(err);
    }

    this.props.data.subscribeToMore({
      document: TWEET_FAVORITED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data || !subscriptionData.data.tweetFavorited) {
          return prev;
        }

        const fevoriteFeed = subscriptionData.data.tweetFavorited;
        return {
          ...prev,
          getTweets: prev.getTweets.map(
            tweet =>
              tweet._id === fevoriteFeed._id
                ? {
                  ...tweet,
                  // update favorite count
                  favoriteCount: fevoriteFeed.favoriteCount,
                }
                : tweet,
          ),
        };
      },
    });
  }

  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    console.log(me);
    this.props.getUserInfo(me);
  };

  render() {
    const { data } = this.props;
    if (data && !data.loading) {
      return (
        <div>
          <TweetForm />
          <TweetsList
            data={data.getTweets}
            class="col-md-8 col-md-offset-2"
          />
        </div>
      );
    } else {
      return (<div>loading...</div>);
    }
  }
}

TweetsList.propTypes = {
  data: PropTypes.array.isRequired
}

export default withApollo(
  compose(
    connect(undefined, { getUserInfo }),
    // connect(null, { getTweets }),
    graphql(GET_TWEETS_QUERY)
  )
    (HomePage)
);