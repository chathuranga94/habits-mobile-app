import HABIT_CONSTANTS from './constants' 

export default {

    getActiveHabits: (habits) => habits.filter(h => h.active),

    saveHabit: (habits, habit, isEdit) => {
        if (isEdit) {
            const index = habits.findIndex(h => h.id === habit.id);
            if(index !== -1) habits[index] = habit;
            return habits;
        } else {
            habits.push({ ...habit, id: '100', icon: 'home', active: true });
            return habits;
        }
    },

    deleteHabit: (habits, habitId) => {
        const index = habits.findIndex(h => h.id === habitId);
        if (index !== -1) habits[index].active = false;
        console.log(habits)
        return habits;
    },

    constructTodayProgress: (habits, habitsHistory) => {
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

                const started = applicableHistory.length > 0 ? true : false;
                const completeness = applicableHistory.length > 0 ? applicableHistory[0].completeness : 0.0;
                const historyId = applicableHistory.length > 0 ? applicableHistory[0].id : 0.0;
                const completedUnits = applicableHistory.length > 0 ? applicableHistory[0].completedUnits : 0;
                const color = completeness === 1 ? '#58D68D' : (completeness === 0) ? '#E74C3C' : '#F1C40F'
                const completedIcon = completeness === 1 ? 'done' : (completeness === 0) ? 'play-arrow' : 'pause-circle-outline';
                const topic = h.units + ' ' + h.type + ' | ' + h.frequency.toUpperCase();

                todayHabits.push({
                    ...h,
                    started,
                    completeness,
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

    updateHabitProgress: (habitsHistory, habit, completeness) => {
        if (habit.started) {
            console.log(`Updating Habit History for ${habit.id}`)

            const index = habitsHistory.findIndex(h => h.id === habit.historyId);
            console.log(habitsHistory[index])
            if (index !== -1) {
                habitsHistory[index].completeness = completeness;
                habitsHistory[index].timestamp = new Date().getTime();
            }
        } else {
            console.log(`Creating Habit History for ${habit.id}`)
            habitsHistory.push({
                id: '180', //uuid.v4(),
                habitId: habit.id,
                completeness: completeness,
                timestamp: new Date().getTime()
            })
        }
        return habitsHistory;
    }

}