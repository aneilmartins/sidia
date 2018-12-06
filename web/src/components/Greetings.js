import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Greetings extends React.Component {

  componentWillMount() {
    const { isAuthenticated, user } = this.props.user;

    if (isAuthenticated) {
      this.context.router.history.push('/tweets');
    }
  }

  renderGreeting = () => {
    const { isAuthenticated, user } = this.props.user;

    if (!isAuthenticated) {
      return (
        <h1>Welcome Twitter</h1>
      );
    } else {
      return (
        <h1>Welcome back {user.username}</h1>
      );
    }
  }

  renderButtons = () => {
    const { isAuthenticated } = this.props.user;

    if (!isAuthenticated) {
      return (
        <div>
          <p><Link className="btn btn-primary btn-lg" to="/signup">Sign up</Link></p>
          <p>OR</p>
          <p><Link className="btn btn-primary btn-lg" to="/login">Login</Link></p>
        </div>
      );
    } else {
      return (
        <div>
          <p><Link className="btn btn-primary btn-lg" to="/tweets">Latest Tweets</Link></p>
        </div>
      );
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.user;

    const isLoading = this.props.user.isLoading;
    if (isLoading) {
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <div className="jumbotron centre-block">
          {this.renderGreeting()}
          <hr />
          {this.renderButtons()}
        </div>
      );
    }
  }
}

Greetings.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(Greetings);