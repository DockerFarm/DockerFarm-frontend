import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { RegistryApi } from 'lib/api';

const LIST = 'registry/LIST';
const IMAGES = 'registry/IMAGES';
const CREATE = 'registry/CREATE';
const UPDATE = 'registry/UPDATE';
const INSPECT = 'registry/INSPECT';
const DELETE = 'registry/DELETE';

export const getRegistryList = createAction(LIST, RegistryApi.getRegistryList);
export const createRegistry = createAction(CREATE, RegistryApi.createRegistry);
export const updateRegistry = createAction(UPDATE, RegistryApi.updateRegistry);
export const deleteRegistry = createAction(DELETE, RegistryApi.deleteRegistry);
export const getRegistryInfo = createAction(INSPECT, RegistryApi.getRegistryInfo);
export const selectAllImages = createAction(IMAGES, RegistryApi.selectAllImages);


const initialState = Map({
    list: List([]),
    inspectData: Map({})
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
