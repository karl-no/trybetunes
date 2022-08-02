import React from 'react';
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
        <h3 data-testid="header-user-name">
          { loading ? <Loading /> : `${username.name} está pronto para o metal!` }
        </h3>
      </header>
    );
  }
}

export default Header;
