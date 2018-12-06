import React from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import LOGIN_MUTATION from '../../graphql/mutations/login';
import { login } from '../../actions/authActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });

    try {
      const { email, password } = this.state;

      const { data } = await this.props.mutate({
        variables: {
          email,
          password,
        },
      });
      console.log(data);

      this.props.addFlashMessage({
        type: 'success',
        text: 'Welcome! :)'
      });

      this.props.login(data.login.token);
      this.context.router.history.push('/');
    } catch (err) {
      this.props.addFlashMessage({
        type: 'error',
        text: (err.message || '').replace('GraphQL error: ', '')
      })

      this.setState({ errors: err.message, isLoading: false })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, email, password, isLoading } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.handleChange}
          value={email}
          field="email"
          type="email"
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.handleChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default compose(graphql(LOGIN_MUTATION), connect(null, { login }))(LoginForm);