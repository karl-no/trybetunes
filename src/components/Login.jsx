import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <input type="text" placeholder="Digite o seu usuário" />
      </div>
    );
  }
}

export default Login;
