// const types = HABIT_CONSTANTS.TYPES
// const frequencies = HABIT_CONSTANTS.FREQUENCIES

const today = new Date();
const todayTimestamp = today.getTime()

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1)
const yesterdayTimestamp = yesterday.getTime()

export const dummyTodos = [
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

export const dummyTodoHistory = [
    {
        id: '100100',
        todoId: '200',
        completed: true,
        timestamp: todayTimestamp
    },
]

// const dummyHabits = [
//     { id: '10', name: 'Read', units: 20, type: types[0],
//         icon: 'home',
//         frequency: frequencies[0],
//         active: true,
//         // createdTimestamp, updatedTimestamp...
//     },
// ];

// const dummyHabitHistory = [
//     { id: '100',  habitId: '10', completedUnits: 20 * 1, timestamp: todayTimestamp }
// ];