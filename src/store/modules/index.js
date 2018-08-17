import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { reducer as formReducer } from 'redux-form/immutable';
import auth from './auth';
import user from './user';
import endPoint from './endpoint';
import container from './container';
import image from './image';
import common from './common';
import network from './network';
import volume from './volume';

export default combineReducers({
    auth,
    user,
    endPoint,
    container,
    image,
    network,
    common,
    volume,
    form: formReducer,
    pender: penderReducer
});