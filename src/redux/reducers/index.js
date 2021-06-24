import { combineReducers } from 'redux';

const appReducers = combineReducers({});

const rootReducers = (state, action) => {
  if (action.type === 'LOG_OUT') {
    // const { loading } = state;
  }

  return appReducers(state, action);
};
export default rootReducers;
