import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { ImageApi } from 'lib/api';

const LIST = 'image/LIST';
const INSPECT = 'image/INSPECT';
const DELETE = 'image/DELETE';
const SEARCH = 'image/SEARCH';
const SET_MODAL_STATE = 'image/SET_MODAL_STATE';
const SET_SEARCH_RESULT = 'image/SET_SEARCH_RESULT';

export const setModalState = createAction(SET_MODAL_STATE); 
export const setSearchResult = createAction(SET_SEARCH_RESULT);
export const getImageList = createAction(LIST, ImageApi.getImageList);
export const getImageInfo = createAction(INSPECT, ImageApi.getImageInfo);
export const searchImage = createAction(SEARCH, ImageApi.searchImage);
export const deleteImage = createAction(DELETE, ImageApi.deleteImage);

const initialState = Map({
    list: List([]),
    searchResult: List([]),
    inspectData: Map({
        info: Map({

        }),
        detail: Map({
            env: List([])
        }),
        history: List([]),
    }),
    modalState: Map({
        show: false,
        image: Map({})
    })
});

export default handleActions({
    [SET_SEARCH_RESULT]: (state, action) => {
        return state.set('searchResult', fromJS(action.payload));
    },
    [SET_MODAL_STATE]: (state, action) => {
        return state.set('modalState', fromJS(action.payload));
    },
    ...pender({
        type: LIST,
        onSuccess(state, action) {
            return state.set('list', fromJS(action.payload.data.result));
        }
    }),
    ...pender({
        type: SEARCH,
        onSuccess(state, action) {
            return state.set('searchResult', fromJS(action.payload.data.result));
        } 
    }),
    ...pender({
        type: INSPECT,
        onSuccess(state, action) {
            const { result } = action.payload.data; 
            return state.setIn(['inspectData','info'], fromJS(result.data.info))
                        .setIn(['inspectData','detail'], fromJS(result.data.detail))
                        .setIn(['inspectData','history'], fromJS(result.history));
        }
    })
},initialState);