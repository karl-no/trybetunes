import React from 'react';
import Header from './Header';

class Favorites extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          <p>Favoritos do metaleiro</p>
        </div>
      </div>
    );
  }
}

export default Favorites;
