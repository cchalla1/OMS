import {applyMiddleware, createStore} from 'redux';
import {createPersistenceMiddleware} from './utils/persistence-middleware';
import masterReducer from './reducers/masterReducer';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const initialState = JSON.parse(window.sessionStorage.getItem('redux-store-key')) || {};

// Persistence middleware saves the current state (after each action) to browser storage.
const persistenceMiddleware = createPersistenceMiddleware(initialState);

const middleware = applyMiddleware(promise(), thunk, persistenceMiddleware);

export default createStore(masterReducer, initialState, middleware);
