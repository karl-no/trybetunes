import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = { music: [], loading: true }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({
      music: songs,
      loading: false,
    });
  }

  render() {
    const { music, loading } = this.state;
    const songsList = music.filter((song) => song.kind === 'song');
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (<Loading />) : (
          <section>
            <div>
              <img
                src={ music[0].artworkUrl100 }
                alt={ music[0].collectionName }
                id={ music[0].collectionName }
              />
              <p data-testid="album-name">{ music[0].collectionName }</p>
              <p data-testid="artist-name">{ music[0].artistName }</p>
            </div>
            <div>
              { songsList.map((song) => {
                const { trackId, trackName, previewUrl } = song;
                return (
                  <MusicCard
                    trackId={ trackId }
                    key={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired }).isRequired,
};

export default Album;
