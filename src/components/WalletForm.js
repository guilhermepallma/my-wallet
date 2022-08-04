import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExpense } from '../redux/actions/index';

const tagName = 'Alimentação';
class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagName,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  sendToGlobalState = () => {
    const { wallet, submitExpense } = this.props;
    this.setState({
      id: wallet.expenses.length }, () => {
      submitExpense(this.state);
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: tagName,
      });
    });
  };

  render() {
    const { value, currency, description, method, tag } = this.state;
    const { wallet } = this.props;
    return (
      <form>
        <label htmlFor="value-cost">
          Valor:
          <input
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleInput }
            data-testid="value-input"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleInput }
            data-testid="currency-input"
          >
            {
              wallet.currencies.map((currencies) => (
                <option value={ currencies } key={ currencies }>{ currencies }</option>))
            }
            ;
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            name="method"
            value={ method }
            onChange={ this.handleInput }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            value={ tag }
            onChange={ this.handleInput }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleInput }
            data-testid="description-input"
          />
        </label>
        <button
          type="button"
          onClick={ () => this.sendToGlobalState() }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}
WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitExpense: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  submitExpense: (expense) => dispatch(fetchExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
