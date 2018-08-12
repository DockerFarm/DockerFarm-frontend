import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { reducer as formReducer } from 'redux-form/immutable';
import auth from './auth';
import user from './user';
import endPoint from './endpoint';
import container from './container';
import image from './image';
import common from './common';

export default combineReducers({
    auth,
    user,
    endPoint,
    container,
    image,
    common,
    form: formReducer,
    pender: penderReducer
});