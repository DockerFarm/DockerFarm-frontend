import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { reducer as formReducer } from 'redux-form/immutable';
import auth from './auth';
import user from './user';

export default combineReducers({
    auth,
    user,
    form: formReducer,
    pender: penderReducer
});