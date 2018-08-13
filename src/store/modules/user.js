import { pender } from 'redux-pender';
import { UserApi } from 'lib/api';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
// import storage from 'lib/storage';

const MY_INFO = 'user/MY_INFO';
const SET_USER_INFO = 'user/SET_USER_INFO';

export const selectMyInfo = createAction(MY_INFO, UserApi.selectMyInfo);
export const setUserInfo = createAction(SET_USER_INFO);

const initialState = Map({
    user: Map({}),
    processed: false
});


export default handleActions({
    [SET_USER_INFO]: (state, action) => {
        return state.set('user', fromJS(action.payload));
    },
    ...pender({
        type: MY_INFO,
        onSuccess(state, action) {
            return state.set('user', fromJS(action.payload.data))
                        .set('processed', true);
        },
        onFailure(state, action) {
            return state.set('user', null)
                        .set('processed', true);
        }
    })
},initialState);