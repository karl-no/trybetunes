import React from 'react';
import Header from './Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          <p>Deixa o cara mudar algo</p>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
