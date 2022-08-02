import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    username: '',
    loading: false,
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      username: userInfo,
      loading: false,
    });
  }

  render() {
    const {
      username,
      loading,
    } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <h3 data-testid="header-user-name">
          { loading ? <Loading /> : `${username.name} está pronto para o metal!` }
        </h3>
      </header>
    );
  }
}

export default Header;
