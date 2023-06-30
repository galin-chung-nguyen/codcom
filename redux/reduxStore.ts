import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/reducers';

// initial states here
const initalState = {
  user: null,
  jwtToken: null,
  toastNotifications: [],
};

// middleware
const middleware = [thunk];

// creating store
export const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
