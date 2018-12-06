import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
  render() {
    const { addFlashMessage } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm 
            addFlashMessage={addFlashMessage}
          />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
}

export default connect(null, { addFlashMessage })(SignupPage);