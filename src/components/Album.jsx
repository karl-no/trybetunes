import React from 'react';
import Header from './Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album from hell</p>
      </div>
    );
  }
}

export default Album;
