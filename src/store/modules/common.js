import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List, set } from 'immutable';

const ADD_MENU_TITLE = 'common/ADD_MENU_TITLE';
const SET_MENU_TITLE = 'common/SET_MENU_TITLE';
const UPDATE_MENU_TITLE = 'common/UPDATE_MENU_TITLE';


export const addMenuTitle = createAction(ADD_MENU_TITLE);
export const setMenuTitle = createAction(SET_MENU_TITLE);
export const updateMenuTitle = createAction(UPDATE_MENU_TITLE);

const initialState = Map({
    menus: List([])
});

export default handleActions({
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