import { pender } from 'redux-pender'
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { SwarmApi } from 'lib/api';

const INFO = 'swarm/INFO';
const INIT = 'swarm/INIT';
const LEAVE = 'swarm/LEAVE';
const JOIN = 'swarm/JOIN';
const TOKEN = 'swarm/TOKEN';

export const getSwarmInfo = createAction(INFO, SwarmApi.getSwarmInfo); 
export const init = createAction(INIT, SwarmApi.swarmInit);
export const leave = createAction(LEAVE, SwarmApi.swarmLeave);
export const join = createAction(JOIN, SwarmApi.swarmJoin);
export const getSwarmToken = createAction(TOKEN, SwarmApi.getSwarmToken);

const initialState = Map({
    info: Map({}),
    token: Map({})
});

export default handleActions({
    ...pender({
        type: INFO,
        onSuccess(state, action) {
            return state.set('info', fromJS(action.payload.data.result));
        }
    }),
    ...pender({
        type: TOKEN,
        onSuccess(state, action) {
            return state.set('token', fromJS(action.payload.data.result));
        }
    })
}, initialState);

