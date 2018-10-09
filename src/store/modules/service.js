import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { ServiceApi } from 'lib/api';

const LIST = 'service/LIST';
const INFO = 'service/INFO';
const DELETE = 'service/DELETE';
const LOG = 'service/LOG';

export const getServiceList = createAction(LIST, ServiceApi.getServiceList);
export const getServiceInfo = createAction(INFO, ServiceApi.getServiceInfo);
export const deleteService = createAction(DELETE, ServiceApi.deleteService);
export const getServiceLog = createAction(LOG, ServiceApi.getServiceLog);

const initialState = Map({
    list: List([]),
    inspectData: Map({
        detail: Map({})
    })
})

export default handleActions({
    ...pender({
        type: LIST,
        onSuccess(state, action){
            return state.set('list', fromJS(action.payload.data.result));
        }
    }),
    ...pender({
        type: INFO,
        onSuccess(state, action) {
            return state.set('inspectData', fromJS(action.payload.data.result));
        }
    })
}, initialState)
