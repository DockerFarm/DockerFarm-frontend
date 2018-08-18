import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions'
import { Map, fromJS, List } from 'immutable';
import { VolumeApi } from 'lib/api';

const LIST = 'volume/LIST';
const DRIVER_LIST = 'volume/DRIVER_LIST';
const INSPECT = 'volume/INSPECT';
const CREATE = 'volume/CREATE';
const DELETE = 'volume/DELETE';


export const getVolumeList = createAction(LIST, VolumeApi.getVolumeList);
export const getVolumeInfo = createAction(INSPECT, VolumeApi.getVolumeInfo);
export const getVolumeDriverList = createAction(DRIVER_LIST, VolumeApi.getVolumeDriverList);
export const createVolume = createAction(CREATE, VolumeApi.createVolume);
export const deleteVolume = createAction(DELETE, VolumeApi.deleteVolume);

const initialState = Map({
    list: List([]),
    driverList: List([]),
    inspectData: Map({
        data: Map({
            volume: Map({})
        }),
        container: List([])
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
    }),
    ...pender({
        type: DRIVER_LIST,
        onSuccess(state, action) {
            return state.set('driverList', fromJS(action.payload.data.result.Driver));
        }
    })
}, initialState);
