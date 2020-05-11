// import HABIT_CONSTANTS from './screens/habits/con/constants`'
const types = ['Minutes', 'Times']
const frequencies = ['Daily', 'Weekly', 'Monthly']


// const dummyHabits = [
//     {
//         id: '10',
//         name: 'Read',
//         units: '20',
//         type: types[0],
//         icon: 'home',
//         frequency: frequencies[0],
//         active: true,
//     },
//     {
//         id: '11',
//         name: 'Spanish',
//         units: '15',
//         type: types[0],
//         icon: 'language',
//         frequency: frequencies[1],
//         start: 6,
//         active: true,
//     },
//     {
//         id: '12',
//         name: 'Read',
//         units: '20',
//         type: types[0],
//         icon: 'home',
//         frequency: frequencies[1],
//         start: 5,
//         active: true,
//     },
//     {
//         id: '13',
//         name: 'Spanish',
//         units: '15',
//         type: types[0],
//         icon: 'language',
//         frequency: frequencies[0],
//         active: true,
//     },
//     {
//         id: '14',
//         name: 'Spanish Review',
//         units: '30',
//         type: types[0],
//         icon: 'language',
//         frequency: frequencies[2],
//         start: 9,
//         active: true,
//     },
//     {
//         id: '15',
//         name: 'HIIT Exercise',
//         units: '2',
//         type: types[1],
//         icon: 'directions-run',
//         frequency: frequencies[0],
//         active: true,
//     },
//     {
//         id: '16',
//         name: 'DEV Articles',
//         units: '30',
//         type: types[0],
//         icon: 'laptop',
//         frequency: frequencies[1],
//         active: true,
//     },
// ];


// // // new Date(2011,8,20)
// // var today = new Date(date.getFullYear(), date.getMonth()...

// const today = new Date();
// console.log(today)
// const todayTimestamp = today.getTime()
// console.log(todayTimestamp)

// let yesterday = new Date();
// yesterday.setDate(yesterday.getDate() - 1)
// console.log(yesterday)
// const yesterdayTimestamp = yesterday.getTime()
// console.log(yesterdayTimestamp)


// const dummyHabitHistory = [
//     {
//         habitId: '10',
//         completeness: 0.8,
//         timestamp: todayTimestamp
//     },
//     {
//         habitId: '10',
//         completeness: 1.0,
//         timestamp: yesterdayTimestamp
//     },
//     {
//         habitId: '15',
//         completeness: 0.5,
//         timestamp: todayTimestamp
//     },
//     {
//         habitId: '13',
//         completeness: 1.0,
//         timestamp: todayTimestamp
//     },
// ];


// const todayHabits = []


// dummyHabits.forEach(h => {
//     if (!h.active) return;

//     const isDailyHabit = h.frequency === frequencies[0];
//     const isWeeklyHabit = (h.frequency === frequencies[1]) && (h.start ==  new Date().getDay())
//     const isMonthlyHabit = (h.frequency === frequencies[2]) && (h.start == new Date().getDate())

//     if (isDailyHabit || isWeeklyHabit || isMonthlyHabit) {
//         const applicableHistory = dummyHabitHistory.filter(hi =>
//             (hi.habitId === h.id) && (new Date(hi.timestamp).toDateString() == new Date().toDateString())
//         );
        
//         const completeness = applicableHistory.length > 0 ? applicableHistory[0].completeness : 0.0;
//         const color = completeness === 1 ? '#58D68D' : (completeness === 0) ? '#E74C3C' : '#F1C40F'
//         const icon = completeness === 1 ? 'done' : (completeness === 0) ? 'pause-circle-outline' : 'play-arrow'
        

//         todayHabits.push({
//             ...h,
//             completeness,
//             color, 
//         })
//     }
// });

// console.log(todayHabits)









// // console.log(new Date().toDateString())

// console.log(new Date().getDay()) // getDay()   0 - 6       sun - 0             getDate()       1 - 31






// const xxx = [[true, true], [true, false]];

// const updatedCompletedUnits = xxx.reduce((sum, row) => {
//     return sum + row.reduce((sum2, val) => sum2 + (val ? 1 : 0))
// }, 0)
// console.log(updatedCompletedUnits)



const dummyHabits = [
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
        start: 0,
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
        start: 10,
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

const dummyHabitHistory = [
    {
        id: '100',
        habitId: '10',
        completedUnits: 20 * 1,
        timestamp: todayTimestamp
    },
    {
        id: '101',
        habitId: '10',
        completedUnits: 20 * 0.8,
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
        completedUnits: 15 * 2 / 3,
        timestamp: todayTimestamp
    },
];

const constructWeekProgress = (habits, habitsHistory) => {
    // const frequencies = HABIT_CONSTANTS.FREQUENCIES;
    const todayHabits = []

    const endTime = new Date()
    endTime.setHours(23, 59, 59)
    console.log(`End Time ${endTime.toString()} and ${endTime.getTime()}`)

    const startTime = new Date()
    startTime.setDate(endTime.getDate() - 6)
    startTime.setHours(00, 00, 00)
    console.log(`Start Time ${startTime.toString()} and ${startTime.getTime()}`)

    const T1 = new Date(), T2 = new Date(), T3 = new Date(), T4 = new Date(),
        T5 = new Date(), T6 = new Date(), T7 = new Date();
    T6.setDate(T7.getDate() - 1)
    T5.setDate(T7.getDate() - 2)
    T4.setDate(T7.getDate() - 3)
    T3.setDate(T7.getDate() - 4)
    T2.setDate(T7.getDate() - 5)
    T1.setDate(T7.getDate() - 6)

    const week = [T1.toDateString(), T2.toDateString(), T3.toDateString(),
        T4.toDateString(), T5.toDateString(), T6.toDateString(), T7.toDateString()]

    console.log(week)

    // COLOR CODES:     PROGRESS: RED TO GREEN      UNAVAILABLE: BLACK (CREATED AFTER...)   N/A (MONTHLY TASK!)

    habits.forEach(h => {
        if (!h.active) return; // TODO DELETED 

        const isDailyHabit = h.frequency === frequencies[0];
        const isWeeklyHabit = (h.frequency === frequencies[1]); //&& (h.start == new Date().getDay())
        // const isMonthlyHabit = (h.frequency === frequencies[2]) && (h.start == new Date().getDate())

        // CONSIDER HABIT INTRODUCED DATE!
 
        if (isDailyHabit) {
            const applicableHistory = habitsHistory.filter(hi => 
                (hi.habitId === h.id) && (hi.timestamp >= startTime.getTime()) && (hi.timestamp < endTime.getTime()));

            const weeklyCompletedUnits = [0, 0, 0, 0, 0, 0, 0]

            applicableHistory.forEach(a => {
                week.forEach((t, i) => {
                    if (new Date(a.timestamp).toDateString() === t) weeklyCompletedUnits[i] = a.completedUnits
                })
            })

            todayHabits.push({
                ...h,
                weeklyCompletedUnits,
            })

        }
    });

    console.log(todayHabits)
    return todayHabits;
}

constructWeekProgress(dummyHabits, dummyHabitHistory)


