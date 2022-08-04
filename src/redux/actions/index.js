export const USER_EMAIL = 'USER_EMAIL';
export const WALLET_CURRENCIES = 'WALLET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXCHANGE_RATES = 'ADD_EXCHANGE_RATES';

export const addEmailAction = (email) => ({
  type: USER_EMAIL,
  email,
});

export const getCurrenciesAction = (currencies) => ({
  type: WALLET_CURRENCIES,
  currencies,
});

export const saveExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const request = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(request);
    const data = await response.json();
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(getCurrenciesAction(currencies));
  };
}

// feito com ajuda do Matheus Santos da turma 22 B.
export function fetchExpense(WalletForm) {
  return async (dispatch) => {
    const request = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(request);
    const data = await response.json();
    const exchangeRates = data;
    const expense = { ...WalletForm, exchangeRates };
    dispatch(saveExpense(expense));
  };
}
