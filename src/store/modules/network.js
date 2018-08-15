import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { NetworkApi } from 'lib/api';

const LIST = 'networks/LIST';
const INSPECT = 'networks/INSPECT';

export const getNetworkList = createAction(LIST, NetworkApi.getNetworkList);
export const getNetworkInfo = createAction(INSPECT, NetworkApi.getNetworkInfo);

const initialState = Map({
    list: List([]),
    inspectData: Map({
        network: Map({}),
        container: List([]),
        options : Map({})
    })
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
            return state.set('inspectData', fromJS(action.payload.data.result));
        }
    })
}, initialState); 