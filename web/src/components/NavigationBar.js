import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';

export class NavigationBar extends React.Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  toggleResponsiveNav = () => {
    const nav = document.getElementById("nav");
    if (nav.className === "responsive") {
      nav.className += " responsive-nav";
    } else {
      nav.className = "responsive";
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const profileRoute = `/my-profile`;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        {this.props.user ? <li><Link to={profileRoute}>My Profile</Link></li> : ''}
        <li> <Link to="/tweets">Tweets</Link></li>
        <li><Link to="/login" onClick={this.logout}>Logout</Link></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    const responsiveUserLinks = (
      <ul id="nav" className="responsive">
        {this.props.user ? <li><Link to={profileRoute}>My Profile</Link></li> : ''}
        <li><Link to="/tweets">Tweets</Link></li>
        <li><Link to="/login" onClick={this.logout}>Logout</Link></li>
      </ul>
    )

    const responsiveGuestLinks = (
      <ul id="nav" className="responsive">
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    )

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Twitter</Link>
          </div>
          <div className="collapse navbar-collapse">
            {isAuthenticated ? userLinks : guestLinks}
          </div>
          <div className="responsive-btn" onClick={this.toggleResponsiveNav}>☰</div>
          <div>
            {isAuthenticated ? responsiveUserLinks : responsiveGuestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default compose(
  connect(state => ({ user: state.user.info })),
  connect(mapStateToProps, { logout })
)(NavigationBar);

// export default connect(mapStateToProps, { logout })(NavigationBar);