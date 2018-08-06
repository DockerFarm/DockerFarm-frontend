import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { reducer as formReducer } from 'redux-form/immutable';
import auth from './auth';
import user from './user';
import endPoint from './endpoint';
import container from './container';

export default combineReducers({
    auth,
    user,
    endPoint,
    container,
    form: formReducer,
    pender: penderReducer
});