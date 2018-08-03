import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { EndpointApi } from 'lib/api';
import { Map, List, fromJS } from 'immutable';

const LIST_ENDPOINT = 'endpoint/LIST';
const ADD_ENDPOINT = 'endpoint/ADD';
const REMOVE_ENDPOINT = 'endpoint/REMOVE';

export const selectAllEndpoint = createAction(LIST_ENDPOINT, EndpointApi.selectAllEndpoint);
export const addEndpoint = createAction(ADD_ENDPOINT, EndpointApi.addEndpoint);

const initialState = Map({
    list: List([])
});

export default handleActions({
    
    ...pender({
        type: LIST_ENDPOINT,
        onSuccess(state, action) {
            return state.set('list', List(action.payload.data));
        }
    }),
    ...pender({
        type: ADD_ENDPOINT
    }),
    ...pender({
        type: REMOVE_ENDPOINT
    })

}, initialState);