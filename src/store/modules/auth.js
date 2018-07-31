import { AuthApi } from 'lib/api';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, fromJS } from 'immutable';

const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOCAL_SIGNUP = 'auth/LOCAL_SIGNUP';
const INIT = 'auth/INIT';

export const init = createAction(INIT);
export const login = createAction(LOCAL_LOGIN, AuthApi.login);
export const signup = createAction(LOCAL_SIGNUP, AuthApi.signup);

const initialState = Map({
    error : ''
});

export default handleActions({
    [INIT]: (state,action) =>{
        return state.set('error', null);
    },
    ...pender({
        type: LOCAL_LOGIN,
        onFailure(state, action) {
            return state.set('error', fromJS(action.payload.response.data));
        }
    }),
    ...pender({
        type: LOCAL_SIGNUP,
        onFailure(state, action) {
            return state.set('error', fromJS(action.payload.response.data));
        }
    })
    
}, initialState);