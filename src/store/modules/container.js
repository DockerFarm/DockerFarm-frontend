import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import { isArray } from 'lodash';
import * as ContainerApi from 'lib/api/container';

const LIST = 'CONTAINER/LIST';
const INSPECT_RAW = 'CONTAINER/INSPECT_RAW';
const INSPECT = 'CONTAINER/INSPECT';
const SET_MODAL_STATE = 'CONTAINER/SET_MODAL_STATE';
const COMMAND = 'CONTAINER/COMMAND';
const PRUNE = 'CONTAINER/PRUNE';
const SET_STEP = 'CONTAINER/SET_STEP';
const CREATE = 'CONTAINER/CREATE';


export const getContainerList = createAction(LIST, ContainerApi.getContainerList);
export const getContainerInfo = createAction(INSPECT, ContainerApi.getContainerInfo);
export const getContainerInspectRaw = createAction(INSPECT_RAW, ContainerApi.getContainerInspectRaw);
export const commandToContainer = createAction(COMMAND, ContainerApi.commandToContainer);
export const pruneContainer = createAction(PRUNE, ContainerApi.pruneContainer);
export const createContainer = createAction(CREATE, ContainerApi.createContainer);

export const setStep = createAction(SET_STEP);
export const setModalState = createAction(SET_MODAL_STATE);

const initialState = Map({
    list: List([]),
    steps: List([]),
    inspectData: Map({
        info: Map({}),
        detail: Map({
            env: List([]),
            labels: Map({})
        }),
        volume: List([])
    }),
    modalState: Map({
        show: false,
        name: '',
        data: Map({})
	}),
});

export default handleActions({
    [SET_STEP]: (state, action) => {
        return state.set('steps', isArray(action.payload) 
                                    ? fromJS(action.payload) : 
                                      state.get('steps').update(arr => !arr.includes(action.payload) ? arr.push(action.payload) : arr));
    },
    [SET_MODAL_STATE]: (state, action) => {
        return state.setIn(['modalState','show'], action.payload.show)
                    .setIn(['modalState','name'], action.payload.name);
    },
    ...pender({
        type: LIST,
        onSuccess(state, action) {
            return state.set('list', fromJS(action.payload.data.result));
        },
        onFailure(state, action) {
            return state.set('list', List([]));
        }
    }),
    ...pender({
        type: INSPECT_RAW,
        onSuccess(state, action) {
            return state.setIn(['modalState','data'], fromJS(action.payload.data.result));
        }
    }),
    ...pender({
        type: INSPECT,
        onSuccess(state, action) {
            return state.set('inspectData', fromJS(action.payload.data.result));
        }
	})
}, initialState);
