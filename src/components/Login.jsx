import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

const MIN_CHAR_NUMBER = 3;

class Login extends React.Component {
  state = {
    username: '',
    saveButtonDisabled: true,
  };

  // this.saveButtonDisabled = this.saveButtonDisabled.bind(this);

  usernameInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { username } = this.state;
      if (username.length >= MIN_CHAR_NUMBER) {
        this.setState({ saveButtonDisabled: false });
      }
    });
  };

  loginButton = async () => {
    const { username } = this.state;
    const { history } = this.props;
    history.push('/loading');
    await createUser({ name: username });
    history.push('/search');
  };

  render() {
    const {
      username,
      saveButtonDisabled,
    } = this.state;
    return (
      <form>
        <div data-testid="page-login">
          <input
            id="login"
            name="username"
            type="text"
            placeholder="Digite o seu usuário"
            data-testid="login-name-input"
            value={ username }
            onChange={ this.usernameInput }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ saveButtonDisabled }
            onClick={ this.loginButton }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Login;
