import { pender } from 'redux-pender'
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { LibraryApi } from 'lib/api';

const LIST = 'library/LIST';

export const getLibraryList = createAction(LIST, LibraryApi.getLibraryList);

const initialState = Map({
    list: List([]),
});

export default handleActions({
    ...pender({
        type: LIST,
        onSuccess(state, action) {
            return state.set('list', fromJS(action.payload.data.result));
        }
    })
}, initialState);