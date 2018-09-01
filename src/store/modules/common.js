import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List, set } from 'immutable';
import { isString, isObject } from 'lodash';

const ADD_MENU_TITLE = 'common/ADD_MENU_TITLE';
const SET_MENU_TITLE = 'common/SET_MENU_TITLE';
const UPDATE_MENU_TITLE = 'common/UPDATE_MENU_TITLE';
const CONFIRM = 'common/CONFIRM';


export const addMenuTitle = createAction(ADD_MENU_TITLE);
export const setMenuTitle = createAction(SET_MENU_TITLE);
export const updateMenuTitle = createAction(UPDATE_MENU_TITLE);
export const confirmAction = createAction(CONFIRM);


export const confirm = arg => dispatch => {
    return new Promise((resolve, reject) => {

        const close = result => _ => {
            dispatch(confirmAction({ show: false, message: ''}));
            resolve(result);
        };

        let param = {
            message: '',
            type: 'confirm',
            size: 'mini' 
        };

        if(isString(arg)) {
            param = { 
               ...param, 
               message: arg
            };
        } else if(isObject(arg)){
            param = arg;
        }

        dispatch(confirmAction({
            ...param,
            show: true,
            onClose: close(false), 
            onConfirm: close(true) 
        }))
    })
}

const initialState = Map({
    menus: List([]),
    confirm: Map({
        show: false,
        message: '',
        type: 'confirm',
        onClose: null,
        onConfirm: null,
        size: 'mini'
    })
});

export default handleActions({
    [CONFIRM]: (state, action) => {
        return state.set('confirm', fromJS(action.payload));
    },
    [SET_MENU_TITLE]: (state, action) => {
        return state.set('menus', fromJS(action.payload));
    },
    [ADD_MENU_TITLE]: (state, action) => {
        return state.set('menus', state.get('menus').push(action.payload));
    },
    [UPDATE_MENU_TITLE]: (state, action) => {
        const { index, menu } = action.payload;
        return state.set('menus', state.get('menus').set(index,menu));
    }
}, initialState);