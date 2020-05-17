import { combineReducers } from 'redux';

// import calcReducer from './add/reducer';
import habitsReducer from './habits/reducer';

const reducers = combineReducers({
    // calc: calcReducer,
    habits: habitsReducer,
});

export default reducers;