import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userEmail, wallet } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">
            {
              wallet.expenses.reduce((acc, curr) => acc
                + (curr.value * curr.exchangeRates[curr.currency].ask), 0).toFixed(2)
            }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  wallet: PropTypes.shape({ expenses: PropTypes.arrayOf(PropTypes.string) }).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
