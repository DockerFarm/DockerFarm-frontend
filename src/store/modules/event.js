import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import * as EventApi from 'lib/api/event';

const LIST = 'EVENT/LIST';

export const getEventList = createAction(LIST, EventApi.getEventList);

const initialState = Map({
	list: List([])
});


export default handleActions({
	...pender({
		type: LIST,
		onSuccess(state, action) {
			return state.set('list', fromJS(action.payload.data.result));
		}
	})
}, initialState);
