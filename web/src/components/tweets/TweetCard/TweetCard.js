import React from 'react';
import { graphql, gql } from 'react-apollo';

import TweetCardHeader from './TweetCardHeader';
import TweetCardBottom from './TweetCardBottom';

import FAVORITE_TWEET_MUTATION from '../../../graphql/mutations/favoriteTweet';


function TweetCard({
  text,
  user,
  createdAt,
  favoriteCount,
  favorite,
  isFavorited,
  placeholder,
  isLoaded
}) {

  return (
    <div>
      <TweetCardHeader {...user} createdAt={createdAt} />
      <div>{text}</div>
      <TweetCardBottom
        isFavorited={isFavorited}
        favoriteCount={favoriteCount}
        onFavoritePress={favorite}
      />
    </div>
  );
}

TweetCard.fragments = {
  tweet: gql`
    fragment TweetCard on Tweet {
      text
      _id
      createdAt
      isFavorited
      favoriteCount
      user {
        username
        avatar
        lastName
        firstName
      }
    }
  `
}

export default graphql(FAVORITE_TWEET_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    favorite: () =>
      mutate({
        variables: { _id: ownProps._id },
        optimisticResponse: {
          __typename: 'Mutation',
          favoriteTweet: {
            __typename: 'Tweet',
            _id: ownProps._id,
            favoriteCount: ownProps.isFavorited
              ? ownProps.favoriteCount - 1
              : ownProps.favoriteCount + 1,
            isFavorited: !ownProps.isFavorited,
          },
        },
      }),
  }),
})(TweetCard);
