import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';

const SET_MENU_TITLE = 'common/SET_MENU_TITLE';
const ADD_MENU_TITLE = 'common/ADD_MENU_TITLE';

export const setMenuTitle = createAction(SET_MENU_TITLE);
export const addMenuTitle = createAction(ADD_MENU_TITLE);

const initialState = Map({
    menus: List([])
});

export default handleActions({
    [SET_MENU_TITLE]: (state, action) => {
        return state.set('menus', fromJS(action.payload));
    },
    [ADD_MENU_TITLE]: (state, action) => {
        return state.update('menus', arr => arr.push(action.payload))
    }
}, initialState);