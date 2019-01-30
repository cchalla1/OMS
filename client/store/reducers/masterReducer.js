import {combineReducers} from 'redux';

import order from './orderReducer';
import products from './productsReducer';
import profile from './profileReducer';

export default combineReducers({
  profile,
  products,
  order
});
