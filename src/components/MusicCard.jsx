import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state= {
    favorite: false,
    loading: false,
  }

  addAsFavorite = () => {
    this.setState({ loading: true }, async () => {
      await addSong({ ...this.props });
      this.setState({
        favorite: true,
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
            checked={ favorite }
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
