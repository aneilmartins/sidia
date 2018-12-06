import React from 'react';

class ProfilePicture extends React.Component {
  render() {
    return (
      <div className="col-sm-6 col-md-4 profile-pic-container">
        <div className="thumbnail">
          <div className="profile-image">Profile Image</div>
          <div className="caption">
            <h3>{this.props.username}</h3>
            <p>Joined: {this.props.joined}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePicture;