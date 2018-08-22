import { pender } from 'redux-pender'
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { LibraryApi } from 'lib/api';

const LIST = 'library/LIST';
const SET_MODAL_STATE = 'library/SET_MODAL_STATE';

export const getLibraryList = createAction(LIST, LibraryApi.getLibraryList);
export const setModalState = createAction(SET_MODAL_STATE); 

const initialState = Map({
    list: List([]),
    modalState: Map({
        show: false,
        image: Map({})
    })
});

export default handleActions({
    [SET_MODAL_STATE]: (state, action) => {
        return state.set('modalState', fromJS(action.payload));
    },
    ...pender({
        type: LIST,
        onSuccess(state, action) {
            return state.set('list', fromJS(action.payload.data.result));
        }
    })
}, initialState);