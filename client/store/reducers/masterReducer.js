import {combineReducers} from 'redux';

import order from './orderReducer';
import orderDetail from './orderDetailsReducer';
import orderHistory from './orderHistoryReducer';
import products from './productsReducer';
import profile from './profileReducer';

export default combineReducers({
  profile,
  products,
  order,
  orderHistory,
  orderDetail
});
