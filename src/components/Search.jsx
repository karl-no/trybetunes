import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
    searchButtonDisabled: true,
    searchBand: '',
    albums: [],
    loading: false,
  };

  searchBandButton = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      const { artist } = this.state;
      if (artist.length > 1) {
        this.setState({ searchButtonDisabled: false });
      }
    });
  };

  searchBand = () => {
    const { artist } = this.state;
    this.setState({ loading: true, searchBand: artist },
      async () => {
        const albums = await searchAlbumsAPI(artist);
        this.setState({
          albums,
          artist: '',
          loading: false,
        });
      });
  }

  render() {
    const {
      artist,
      searchButtonDisabled,
      searchBand,
      albums,
      loading,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <input
              id="inputSearchBand"
              type="text"
              name="artist"
              data-testid="search-artist-input"
              placeholder="Banda ou artista"
              value={ artist }
              onChange={ this.searchBandButton }
            />
            <button
              id="buttonSearchBand"
              type="submit"
              data-testid="search-artist-button"
              disabled={ searchButtonDisabled }
              onClick={ this.searchBand }
            >
              Pesquisar
            </button>
          </div>
        )}
        <div>
          {!albums.length ? 'Nenhum álbum foi encontrado' : (
            <div>
              <p>{`Resultado de álbuns de: ${searchBand}`}</p>
              {albums.map(({
                artistName,
                collectionId,
                collectionName,
                collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <p><strong>{ artistName }</strong></p>
                  <p>{ collectionPrice }</p>
                  <p>{ releaseDate }</p>
                  <p>{ trackCount }</p>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    {collectionName}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
