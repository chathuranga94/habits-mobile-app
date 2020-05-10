import HABIT_CONSTANTS from './constants'
import HabitManager from './manager'
// import { dummyHabits } from './data'

const types = HABIT_CONSTANTS.TYPES
const frequencies = HABIT_CONSTANTS.FREQUENCIES

const dummyHabits = [
    {
        id: '10',
        name: 'Read',
        units: '20',
        type: types[0],
        icon: 'home',
        frequency: frequencies[0],
        active: true,
        // createdTimestamp, updatedTimestamp...
    },
    {
        id: '11',
        name: 'Spanish',
        units: '15',
        type: types[0],
        icon: 'language',
        frequency: frequencies[1],
        start: 6,
        active: true,
    },
    {
        id: '12',
        name: 'Read',
        units: '20',
        type: types[0],
        icon: 'home',
        frequency: frequencies[1],
        start: 5,
        active: true,
    },
    {
        id: '13',
        name: 'Spanish',
        units: '15',
        type: types[0],
        icon: 'language',
        frequency: frequencies[0],
        active: true,
    },
    {
        id: '14',
        name: 'Spanish Review',
        units: '30',
        type: types[0],
        icon: 'language',
        frequency: frequencies[2],
        start: 9,
        active: true,
    },
    {
        id: '15',
        name: 'HIIT Exercise',
        units: 10, // TODO BIBI: STRING
        type: types[1],
        icon: 'directions-run',
        frequency: frequencies[0],
        active: true,
    },
    {
        id: '150',
        name: 'HIIT Exercise',
        units: 10, // TODO BIBI: STRING
        type: types[1],
        icon: 'directions-run',
        frequency: frequencies[0],
        active: true,
    },
    {
        id: '16',
        name: 'DEV Articles',
        units: '30',
        type: types[0],
        icon: 'laptop',
        frequency: frequencies[1],
        active: true,
    },
];

const today = new Date();
console.log(today)
const todayTimestamp = today.getTime()
console.log(todayTimestamp)

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1)
console.log(yesterday)
const yesterdayTimestamp = yesterday.getTime()
console.log(yesterdayTimestamp)

const dummyHabitHistory = [
    {
        id: '100',
        habitId: '10',
        completeness: 0.8,
        timestamp: todayTimestamp
    },
    {
        id: '101',
        habitId: '10',
        completeness: 1.0,
        timestamp: yesterdayTimestamp
    },
    {
        id: '102',
        habitId: '15',
        completeness: 0.5,
        completedUnits: 2,
        timestamp: todayTimestamp
    },
    {
        id: '103',
        habitId: '13',
        completeness: 1.0,
        timestamp: todayTimestamp
    },
];

const HABITS_STORE = {
    habits: dummyHabits || [],
    habitsHistory: dummyHabitHistory || []
}

export default function calc(state = HABITS_STORE, { type, payload }) {
    switch (type) {
        case HABIT_CONSTANTS.SAVE_HABIT:
            return { ...state,  habits: HabitManager.saveHabit(state.habits, payload.habit, payload.isEdit) }
        case HABIT_CONSTANTS.DELETE_HABIT:
            return { ...state, habits: HabitManager.deleteHabit(state.habits, payload.habitId) } 
        case HABIT_CONSTANTS.SAVE_HABIT_PROGRESS:
            return {
                ...state,
                habitsHistory: HabitManager.updateHabitProgress(state.habitsHistory, payload.habit, payload.completeness)
            } 
        default:
            return state
    }
}
