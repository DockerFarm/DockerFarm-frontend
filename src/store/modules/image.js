import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { ImageApi } from 'lib/api';

const LIST = 'image/LIST';

export const getImageList = createAction(LIST, ImageApi.getImageList);

const initialState = Map({
    list: List([])
});

export default handleActions({
    ...pender({
        type: LIST,
        onSuccess(state, action) {
            return state.set('list', fromJS(action.payload.data.result));
        }
    })
},initialState);