// const types = ['Minutes', 'Times']
// const frequencies = ['Daily', 'Weekly', 'Monthly']

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


const PROGRESS_COLOUR = (percentage) => {
    // https://www.colorhexa.com/58d68d-to-e74c3c => Reverse HSV Gradient
    const ceil = Math.ceil((percentage) / 10) * 10;

    switch (ceil) {
        case 0: return "#e74c3c";
        case 10: return "#e66f3f";
        case 20: return "#e49041";
        case 30: return "#e3af43";
        case 40: return "#e1cd46";
        case 50: return "#d6e048";
        case 60: return "#b8de4b";
        case 70: return "#9cdd4d";
        case 80: return "#68da51";
        case 90: return "#54d958";
        case 100: return "#58d68d";
        default: return d + "100";
    }
}
console.log(PROGRESS_COLOUR(0.00))
console.log(PROGRESS_COLOUR(0.01))
console.log(PROGRESS_COLOUR(9.99))
console.log(PROGRESS_COLOUR(10.00))
console.log(PROGRESS_COLOUR(10.01))
console.log(PROGRESS_COLOUR(33.33))