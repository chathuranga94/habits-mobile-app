import HABIT_CONSTANTS from './constants'
import HabitManager from './manager'
import { dummyTodos, dummyTodoHistory } from './data'

const TODO_STORE = {
    todos: __DEV__ ? dummyTodos : [],
    todosHistory: __DEV__ ? dummyTodoHistory : [],
}

export default function calc(state = TODO_STORE, { type, payload }) {
    switch (type) {
        // case HABIT_CONSTANTS.SAVE_HABIT:
        //     return { ...state,  habits: HabitManager.saveHabit(state.habits, payload.habit, payload.isEdit) }
        // case HABIT_CONSTANTS.DELETE_HABIT:
        //     return { ...state, habits: HabitManager.deleteHabit(state.habits, payload.habitId) } 
        // case HABIT_CONSTANTS.SAVE_HABIT_PROGRESS:
        //     return {
        //         ...state,
        //         habitsHistory: HabitManager.updateHabitProgress(state.habitsHistory, payload.habit, payload.completedUnits)
        //     } 
        default:
            return state
    }
}
