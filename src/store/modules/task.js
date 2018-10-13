import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS} from 'immutable';
import { TaskApi } from 'lib/api';


const LIST = 'task/LIST';
const INFO = 'task/TASK';
const LOG = 'task/LOG';

export const getTaskList = createAction(LIST, TaskApi.getTaskList);
export const getTaskInfo = createAction(INFO, TaskApi.getTaskInfo);
export const getTaskLog = createAction(LOG, TaskApi.getTaskLog);

const initialState = Map({
    list: List([]),
    inspectData: Map({

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
        type: INFO,
        onSuccess(state, action) {
            return state.set('inspectData', fromJS(action.payload.data.result));
        }
    })
}, initialState);
