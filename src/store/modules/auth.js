import { AuthApi } from 'lib/api';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, fromJS } from 'immutable';

const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOCAL_SIGNUP = 'auth/LOCAL_SIGNUP';
const INIT = 'auth/INIT';
const LOGOUT = 'aut/LOGOUT';

export const init = createAction(INIT);
export const login = createAction(LOCAL_LOGIN, AuthApi.login);
export const signup = createAction(LOCAL_SIGNUP, AuthApi.signup);
export const logout = createAction(LOGOUT, AuthApi.logout);


const initialState = Map({
    error : ''
});

export default handleActions({
    [INIT]: (state,action) =>{
        return state.set('error', null);
    },
    ...pender({
        type: LOCAL_LOGIN
    }),
    ...pender({
        type: LOCAL_SIGNUP
    })
}, initialState);