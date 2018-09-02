import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { EndpointApi } from 'lib/api';
import { Map, List, fromJS } from 'immutable';

const LIST_ENDPOINT = 'endpoint/LIST';
const ADD_ENDPOINT = 'endpoint/ADD';
const REMOVE_ENDPOINT = 'endpoint/REMOVE';
const UPDATE_ENDPOINT = 'endpoint/UPDATE';
const ACTIVE_ENDPOINT = 'endpoint/ACTIVE';
const SELECT_ROW = 'endpoint/SELECT_ROW';



export const REGISTER_MODE = 'REGISTER';
export const MODIFY_MODE = 'MODIFY';

export const selectAllEndpoint = createAction(LIST_ENDPOINT, EndpointApi.selectAllEndpoint);
export const addEndpoint = createAction(ADD_ENDPOINT, EndpointApi.addEndpoint);
export const removeEndpoint = createAction(REMOVE_ENDPOINT, EndpointApi.removeEndpoint);
export const updateEndpoint = createAction(UPDATE_ENDPOINT, EndpointApi.updateEndpoint);
export const activeEndpoint = createAction(ACTIVE_ENDPOINT, EndpointApi.activeEndpoint);
export const selectRow = createAction(SELECT_ROW);

const initialState = Map({
    list: List([]),
    mode: REGISTER_MODE,
    selectRow: Map({}),
    error: '' 
});

export default handleActions({
    [SELECT_ROW]: (state, action) => {
        return state.set('selectRow', action.payload == null ? null : Map(action.payload))
                    .set('mode', action.payload == null ? REGISTER_MODE : MODIFY_MODE);
    },
    ...pender({
        type: LIST_ENDPOINT,
        onSuccess(state, action) {
            return state.set('list', List(action.payload.data.data))
                        .set('error', null)
        }
    }),
    ...pender({
        type: REMOVE_ENDPOINT,
        onSuccess(state, action) {
            return state.set('selectRow', null)
                        .set('mode', REGISTER_MODE);
        }
    })

}, initialState);