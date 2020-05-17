import uuid from 'react-native-uuid';
import HABIT_CONSTANTS from './constants' 

export default {

    getActiveHabits: (habits) => habits.filter(h => h.active),

    saveHabit: (habits, habit, isEdit) => {
        if (isEdit) {
            habit.updatedAt = new Date().getTime();
            const index = habits.findIndex(h => h.id === habit.id);
            if(index !== -1) habits[index] = habit;
            return habits;
        } else {
            habit.createdAt = new Date().getTime()
            habit.updatedAt = habit.createdAt
            habits.push({ ...habit, id: uuid.v4(), active: true });
            return habits;
        }
    },

    deleteHabit: (habits, habitId) => {
        const index = habits.findIndex(h => h.id === habitId);
        if (index !== -1) habits[index].active = false;
        console.log(habits)
        return habits;
    },

    constructTodayProgress2: (habits, habitsHistory) => {
        const frequencies = HABIT_CONSTANTS.FREQUENCIES;
        const todayHabits = []

        habits.forEach(h => {
            if (!h.active) return;

            const isDailyHabit = h.frequency === frequencies[0];
            const isWeeklyHabit = (h.frequency === frequencies[1]) && (h.start == new Date().getDay())
            const isMonthlyHabit = (h.frequency === frequencies[2]) && (h.start == new Date().getDate())

            if (isDailyHabit || isWeeklyHabit || isMonthlyHabit) {
                const applicableHistory = habitsHistory.filter(hi =>
                    (hi.habitId === h.id) && (new Date(hi.timestamp).toDateString() == new Date().toDateString())
                );

                const goalUnits = h.units;
                const started = applicableHistory.length > 0 ? true : false;
                const historyId = applicableHistory.length > 0 ? applicableHistory[0].id : 0.0;
                const completedUnits = applicableHistory.length > 0 ? applicableHistory[0].completedUnits : 0;
                const completedFraction = (completedUnits && goalUnits) ? completedUnits / goalUnits : 0.0;
                const completedPercentage = parseFloat(completedFraction * 100).toFixed(2)
                const color = HABIT_CONSTANTS.PROGRESS_COLOUR(completedPercentage);
                const completedIcon = completedUnits === goalUnits ? 'done' : (completedUnits === 0) ? 'play-arrow' : 'pause-circle-outline';
                const topic = h.units + ' ' + h.type + ' | ' + h.frequency.toUpperCase();

                todayHabits.push({
                    ...h,
                    started,
                    historyId,
                    completedUnits,
                    color,
                    completedIcon,
                    topic,
                })
            }
        });
        return todayHabits;
    },

    constructTodayProgress: (todos, todosHistory) => {
        const todaysTodos = [];

        todos.forEach(t => {
            if (t.dueDate === new Date().getDay()) return; // TODO BIBI: Handle here.

            const applicableHistory = todosHistory.find(h => h.todoId === t.id);
            const completed = applicableHistory ? applicableHistory.completed : false;
            // const completedIcon = completed ? 'done' : 'play-arrow'
            const color = completed === 1 ? '#58D68D' : (completed === 0) ? '#E74C3C' : '#F1C40F'
            const topic = '1/2 completed, Due today';

            todaysTodos.push({
                ...t,
                completed,
                color,
                topic,
                // topic for subtitle...
            });
        });

        return todaysTodos;
    },

    updateHabitProgress: (habitsHistory, habit, completedUnits) => {
        if (habit.started) {
            console.log(`Updating Habit History for ${habit.id}`)

            const index = habitsHistory.findIndex(h => h.id === habit.historyId);
            console.log(habitsHistory[index])
            if (index !== -1) {
                habitsHistory[index].completedUnits = completedUnits;
                habitsHistory[index].timestamp = new Date().getTime();
            }
        } else {
            console.log(`Creating Habit History for ${habit.id}`)
            habitsHistory.push({
                id: uuid.v4(),
                habitId: habit.id,
                completedUnits: completedUnits,
                timestamp: new Date().getTime()
            })
        }
        return habitsHistory;
    },

    getTimeConstraints: () => {
        const endTime = new Date()
        endTime.setHours(23, 59, 59)
        console.log(`End Time ${endTime.toString()} and ${endTime.getTime()}`)

        const startTime = new Date()
        startTime.setDate(endTime.getDate() - 6)
        startTime.setHours(0, 0, 0)
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

        return { startTime, endTime, week }
    },

    constructWeekProgress: (habits, habitsHistory, timeConstraints) => {
        const frequencies = HABIT_CONSTANTS.FREQUENCIES;
        const todayHabits = []

        const { endTime, startTime, week } = timeConstraints;

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

}