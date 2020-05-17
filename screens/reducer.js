import { combineReducers } from 'redux';

import todoReducer from './todo/reducer'
import habitsReducer from './habits/reducer';

const reducers = combineReducers({
    todo: todoReducer,
    habits: habitsReducer,
});

export default reducers;
