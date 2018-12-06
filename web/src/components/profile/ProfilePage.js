import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfilePicture from './ProfilePicture';
import ProfileTweets from './ProfileTweets';

import { graphql, compose, withApollo } from 'react-apollo';

import GET_USER_TWEETS_QUERY from '../../graphql/queries/getUserTweets';
import USER_QUERY from '../../graphql/queries/user';
import GET_TWEETS_BY_USER from '../../graphql/queries/getTweetsByUser';

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { getUser } = this.props.getUser;
    const userLoading = this.props.getUser.loading;
    if (userLoading) {
      return (
        <div>Loading..</div>
      );
    } else {
      return (
        <div className="row">
          {!userLoading ?
            <ProfilePicture
              username={getUser.username}
              joined={new Date(getUser.createdAt).toString().slice(3, 15)} />
            : ''}
          <ProfileTweets
            class="col-md-6 col-md-offset-1 col-sm-12"
            user={getUser}
            tweets={this.props.getUserTweets} />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.user
  }
}

export default withApollo(compose(
  // graphql(USER_QUERY),
  connect(mapStateToProps),
  // connect(state => ({ user: state.auth })),
  connect(state => ({ info: state.user.info })),
  graphql(USER_QUERY, {
    name: "getUser",
    options: (props) => ({
      variables: { 
        _id: props.match.params.id || props.auth._id
      }
    })
  }),
  graphql(GET_TWEETS_BY_USER, {
    name: "getUserTweets",
    options: (props) => ({
      variables: { _id: props.match.params.id || props.auth._id }
    })
  }),
)(ProfilePage));