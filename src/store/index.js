import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import penderMiddleware from 'redux-pender';
import modules from './modules';

const logger = createLogger();

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

const store = createStore(modules, composeEnhancers(applyMiddleware(logger,thunkMiddleware, penderMiddleware())));


export default store;