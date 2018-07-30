import { AuthAPI } from 'lib/api';
import { createAction, handleActions } from 'redux-action';
import { pender } from 'redux-pender';

const LOGIN = 'auth/LOGIN';

export const login = createAction(LOGIN, AuthAPI.login);

const initialState = Map({
    form : {

    }
})