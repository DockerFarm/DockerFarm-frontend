import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { reducer as formReducer } from 'redux-form/immutable';
import auth from './auth';

export default combineReducers({
    auth,
    form: formReducer,
    pender: penderReducer
});