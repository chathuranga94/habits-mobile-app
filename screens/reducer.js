import { combineReducers } from 'redux';

import calcReducer from './add/reducer';

const reducers = combineReducers({
    calc: calcReducer,
});

export default reducers;