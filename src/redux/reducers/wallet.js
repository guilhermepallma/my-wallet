const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case 'DELETE_EXPENSE':
    return {
      // https://stackoverflow.com/questions/57519905/how-delete-item-from-redux-state.
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
