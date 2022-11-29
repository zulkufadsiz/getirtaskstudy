import { combineReducers } from 'redux';
import product from './products.reducer';
import filter from './filters.reducer';
import company from './company.reducer';
import cart from './cart.reducer';
const createReducer = () => (state, action) => {
  const combineReducer = combineReducers({
    product,
    filter,
    company,
    cart
  });

  if (action.type === 'resetState') {
    state = undefined;
  }
  return combineReducer(state, action);
};

export default createReducer;
