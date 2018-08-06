import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import * as ContainerApi from 'lib/api/container';

const LIST = 'CONTAINER/LIST';
const INSPECT_RAW = 'CONTAINER/INSPECT_RAW';
const SET_MODAL_STATE = 'CONTAINER/SET_MODAL_STATE';

export const getContainerList = createAction(LIST, ContainerApi.getContainerList);
export const getContainerInspectRaw = createAction(INSPECT_RAW, ContainerApi.getContainerInspectRaw);
export const setModalState = createAction(SET_MODAL_STATE);

const initialState = Map({
    list: List([]),
    inspectData: Map({}),
    modalState: Map({})
});

export default handleActions({
    [SET_MODAL_STATE]: (state, action) => {
        return state.set('modalState', fromJS(action.payload));
    },
    ...pender({
        type: LIST,
        onSuccess(state, action) {
            return state.set('list', fromJS(action.payload.data.result));
        }
    }),
    ...pender({
        type: INSPECT_RAW,
        onSuccess(state, action) {
            return state.set('inspectData', fromJS(action.payload.data.result));
        }
    })
}, initialState);