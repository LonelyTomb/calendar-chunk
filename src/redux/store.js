import {
  createStore, applyMiddleware, compose,
} from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './reducers';

const middleware = process.env.NODE_ENV === 'development' ? [thunkMiddleware, logger] : [thunkMiddleware];
export default function configureStore(initialState = {}) {

  const enhancer = compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : (f) => f);
  return createStore(rootReducers, initialState, enhancer);
}
