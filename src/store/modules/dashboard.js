import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { DashBoardApi } from 'lib/api';

const INFO = 'dashboard/INFO';

export const getDashBoardInfo = createAction(INFO, DashBoardApi.getDashBoardInfo);

const initialState = Map({
    data: Map({
        info: Map({}),
        summary: Map({
            container: Map({}),
            image: Map({}),
            network: Map({}),
            volume: Map({})
        }),
        engine: Map({
            version: Map({})
        })
    })
});

export default handleActions({
    ...pender({
        type: INFO,
        onSuccess(state, action){
            return state.set('data', fromJS(action.payload.data.result));
        }
    })
},initialState);
