import React from 'react';
import Header from './Header';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          <p>O cidadão ouvinte</p>
        </div>
      </div>
    );
  }
}

export default Profile;
