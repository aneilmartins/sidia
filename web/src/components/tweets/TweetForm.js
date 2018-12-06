import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

import CREATE_TWEET_MUTATION from '../../graphql/mutations/createTweet';

class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
      isLoading: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  _onCreateTweetPress = async () => {
    const { user } = this.props;

    this.setState({ errors: {}, isLoading: true });
    try {
      const { text } = this.state;
      const { tweet } = await this.props.mutate({
        variables: {
          text
        },
      });
      // now we wait until subscription updates

      this.setState({ text: '', isLoading: false });
    } catch (err) {
      this.setState({ errors: err.response.data.errors, isLoading: false });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this._onCreateTweetPress();
  }


  render() {
    const { text, errors, isLoading } = this.state;

    return (
      <div className="col-md-8 col-md-offset-2">
        <form onSubmit={this.handleSubmit}>
          <h3>Create New Tweet</h3>

          <TextFieldGroup
            field="text"
            label="Tweet Text"
            onChange={this.handleChange}
            value={text}
            type="text"
            name="text"
            error={errors.tweet}
          />

          <button type="submit" className="btn btn-primary">Add</button>
        </form>
        <hr />
      </div>
    );
  }
}

export default compose(
  graphql(CREATE_TWEET_MUTATION),
  connect(state => ({ user: state.user.info }))
)(TweetForm);