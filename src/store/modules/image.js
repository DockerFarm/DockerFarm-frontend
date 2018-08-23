import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { ImageApi } from 'lib/api';

const LIST = 'image/LIST';
const INSPECT = 'image/INSPECT';
const DELETE = 'image/DELETE';

export const getImageList = createAction(LIST, ImageApi.getImageList);
export const getImageInfo = createAction(INSPECT, ImageApi.getImageInfo);
export const deleteImage = createAction(DELETE, ImageApi.deleteImage);

const initialState = Map({
    list: List([]),
    inspectData: Map({
        info: Map({

        }),
        detail: Map({
            env: List([])
        }),
        history: List([])
    }),
});

export default handleActions({
    ...pender({
        type: LIST,
        onSuccess(state, action) {
            return state.set('list', fromJS(action.payload.data.result));
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