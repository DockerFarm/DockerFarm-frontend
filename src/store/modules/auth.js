import { AuthApi } from 'lib/api';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, fromJS } from 'immutable';

const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';

export const login = createAction(LOCAL_LOGIN, AuthApi.login);

const initialState = Map({
    error : ''
});

export default handleActions({

    ...pender({
        type: LOCAL_LOGIN,
        onFailure(state, action) {
            return state.set('error', fromJS(action.payload.response.data));
        }
    })
    
}, initialState);