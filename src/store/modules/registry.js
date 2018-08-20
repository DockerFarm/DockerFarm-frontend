import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { RegistryApi } from 'lib/api';

const LIST = 'registry/LIST';

export const getRegistryList = createAction(LIST, RegistryApi.getRegistryList);

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
}, initialState);
