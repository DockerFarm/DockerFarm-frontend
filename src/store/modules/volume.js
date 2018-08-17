import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions'
import { Map, fromJS, List } from 'immutable';
import { VolumeApi } from 'lib/api';

const LIST = 'volume/LIST';
const INSPECT = 'volume/INSPECT';

export const getVolumeList = createAction(LIST, VolumeApi.getVolumeList);
export const getVolumeInfo = createAction(INSPECT, VolumeApi.getVolumeInfo);

const initialState = Map({
    list: List([]),
    inspectData: Map({
        volume: Map({})
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
            const { result } = action.payload.data;
            return state.set('inspectData', fromJS(result));
        }
    })
}, initialState);
