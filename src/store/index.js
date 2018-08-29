import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import penderMiddleware from 'redux-pender';
import modules from './modules';
import locale from 'locale';

const logger = createLogger();

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

const lang = localStorage.getItem('lang') || 'en';
const initialState = {
	intl: {
		locale: lang,
		messages: locale(lang)
	}
}
const store = createStore(modules, initialState, composeEnhancers(applyMiddleware(logger,thunkMiddleware, penderMiddleware())));


export default store;