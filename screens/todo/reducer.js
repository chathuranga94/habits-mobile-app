import HABIT_CONSTANTS from './constants'
import HabitManager from './manager'
// import { dummyHabits } from './data'

const types = HABIT_CONSTANTS.TYPES
const frequencies = HABIT_CONSTANTS.FREQUENCIES

const today = new Date();
const todayTimestamp = today.getTime()

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1)
const yesterdayTimestamp = yesterday.getTime()

const dummyTodos = [
  {
    id: '200',
    name: 'Read',
    // units: If 1 whole todo. Else nested todo. -> if nested subtitle...
  },
  {
    id: '300',
    name: 'Spanish',
  },
  {
    id: '400',
    name: 'HIIT Exercise',
  },
  {
    id: '100',
    name: 'DEV Articles',
  },
];

const dummyTodoHistory = [
    {
        id: '100100',
        todoId: '200',
        completed: true,
        timestamp: todayTimestamp
    },
]

const dummyHabits = [
    { id: '10', name: 'Read', units: 20, type: types[0],
        icon: 'home',
        frequency: frequencies[0],
        active: true,
        // createdTimestamp, updatedTimestamp...
    },
];

const dummyHabitHistory = [
    { id: '100',  habitId: '10', completedUnits: 20 * 1, timestamp: todayTimestamp }
];

const TODO_STORE = {
    todos: dummyTodos || [],
    todosHistory: dummyTodoHistory || [],
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
