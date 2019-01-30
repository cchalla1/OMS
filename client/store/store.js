import {applyMiddleware, createStore} from 'redux';

import masterReducer from './reducers/masterReducer';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(promise(), thunk);

export default createStore(masterReducer, {}, middleware);
