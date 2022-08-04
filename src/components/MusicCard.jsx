import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state= {
    favorite: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      favorite: await getFavoriteSongs(),
    });
  }

  addAsFavorite = () => {
    this.setState({ loading: true }, async () => {
      await addSong({ ...this.props });
      const { favorite } = this.state;
      this.setState({
        favorite: [...favorite, this.props],
        loading: false,
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    const favoriteSongs = favorite.some((song) => trackId === song.trackId);

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteCheckbox">
          <input
            id="favoriteCheckbox"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favoriteSongs }
            onChange={ this.addAsFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
