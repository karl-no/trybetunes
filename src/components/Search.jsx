import React from 'react';
// import PropTypes from 'prop-types';
import Header from './Header';

// MIN_BAND_NAME_LENGTH = 2;

class Search extends React.Component {
  state = {
    bandName: '',
    searchButtonDisabled: true,
  };

  searchBandButton = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      const { bandName } = this.state;
      if (bandName.length > 1) {
        this.setState({ searchButtonDisabled: false });
      }
    });
  };

  render() {
    const {
      bandName,
      searchButtonDisabled,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            id="inputSearchBand"
            type="text"
            name="bandName"
            data-testid="search-artist-input"
            placeholder="Banda ou artista"
            value={ bandName }
            onChange={ this.searchBandButton }
          />
          <button
            id="buttonSearchBand"
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
