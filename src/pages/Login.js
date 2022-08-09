import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmailAction } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      button: true,
    };
  }

  // Pega o input de e-mail e senha.
  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.enableButton();
    });
  }

  // Verifica se o e-mail e senha coresponde os requisitos mínimos.
  // src: Onde peguei o Regex pronto, https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  enableButton = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (regexEmail.test(email) && password.length >= minLength) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  // Envia o state 'email' para o reducer/index.js. Em seguida encaminha o usuario para a page (/carteira).
  sendToGlobalState = () => {
    const { email } = this.state;
    const { submitEmail, history } = this.props;
    submitEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, button } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={ email }
          onChange={ this.handleInput }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={ password }
          onChange={ this.handleInput }
          data-testid="password-input"
        />
        <button
          type="button"
          name="Entrar"
          disabled={ button }
          onClick={ this.sendToGlobalState }
        >
          Entrar
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  submitEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (email) => dispatch(addEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
