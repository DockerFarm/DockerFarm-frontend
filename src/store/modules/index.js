import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { reducer as formReducer } from 'redux-form/immutable';

export default combineReducers({

    form: formReducer,
    pender: penderReducer
});