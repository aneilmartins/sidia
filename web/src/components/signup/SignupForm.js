import React from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import validateInput from './Validate';

import SIGNUP_MUTATION from '../../graphql/mutations/signup';

import { login } from '../../actions/authActions';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      //aqui faz a mutation

      const { fullName, email, password, username } = this.state;

      try {
        // signup
        const { data } = await this.props.mutate({
          variables: {
            fullName,
            username,
            email,
            password,
          },
        });
        console.log(data);

        this.props.addFlashMessage({
          type: 'success',
          text: 'You have signed up. Now Welcome! :)'
        });

        // set token
        this.props.login(data.signup.token);

        this.setState({ errors: {}, isLoading: false });
        this.context.router.history.push('/');
      } catch (err) {
        this.props.addFlashMessage({
          type: 'error',
          text: (err.message || '').replace('GraphQL error: ', '')
        })

        this.setState({ errors: err.message, isLoading: false })
      }
    }

  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join React Twitter</h1>

        <TextFieldGroup
          error={errors.fullName}
          label="Full Name"
          onChange={this.onChange}
          value={this.state.fullName}
          field="fullName"
          type="text"
        />
        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          value={this.state.username}
          field="username"
          type="text"
        />
        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
          type="email"
        />
        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />
        <TextFieldGroup 
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />
        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  addFlashMessage: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default compose(graphql(SIGNUP_MUTATION), connect(null, { login }))(SignupForm);
