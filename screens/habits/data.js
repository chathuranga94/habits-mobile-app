import HABIT_CONSTANTS from './constants'

const types = HABIT_CONSTANTS.TYPES
const frequencies = HABIT_CONSTANTS.FREQUENCIES

export const dummyHabits = [
    {
        id: '10',
        name: 'Read',
        units: 20,
        type: types[0],
        icon: 'home',
        frequency: frequencies[0],
        active: true,
        // createdTimestamp, updatedTimestamp...
    },
    {
        id: '11',
        name: 'Spanish',
        units: 15,
        type: types[0],
        icon: 'language',
        frequency: frequencies[1],
        start: 6,
        active: true,
    },
    {
        id: '12',
        name: 'Read',
        units: 20,
        type: types[0],
        icon: 'home',
        frequency: frequencies[1],
        start: 5,
        active: true,
    },
    {
        id: '13',
        name: 'Spanish',
        units: 15,
        type: types[0],
        icon: 'language',
        frequency: frequencies[0],
        active: true,
    },
    {
        id: '14',
        name: 'Spanish Review',
        units: 30,
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
        units: 30,
        type: types[0],
        icon: 'laptop',
        frequency: frequencies[1],
        active: true,
    },
];

const today = new Date();
const todayTimestamp = today.getTime()

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1)
const yesterdayTimestamp = yesterday.getTime()

export const dummyHabitHistory = [
    {
        id: '100',
        habitId: '10',
        completedUnits: 20 * 1,
        timestamp: todayTimestamp
    },
    {
        id: '101',
        habitId: '10',
        completedUnits: 20 * 1,
        timestamp: yesterdayTimestamp
    },
    {
        id: '102',
        habitId: '15',
        completedUnits: 10 * 0.5,
        timestamp: todayTimestamp
    },
    {
        id: '103',
        habitId: '13',
        completedUnits: 15 * 2/3,
        timestamp: todayTimestamp
    },
];