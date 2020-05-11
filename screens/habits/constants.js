export default {
    SAVE_HABIT: 'SAVE_HABIT',
    DELETE_HABIT: 'DELETE_HABIT',
    SAVE_HABIT_PROGRESS: 'SAVE_HABIT_PROGRESS',

    TYPES: ['Minutes', 'Times'],
    FREQUENCIES: ['Daily', 'Weekly', 'Monthly'],
    WEEK_DAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    MONTH_DAYS: (d) => {
        if (d > 3 && d < 21) return d + 'th';
        switch (d % 10) {
            case 1: return d + "st";
            case 2: return d + "nd";
            case 3: return d + "rd";
            default: return d + "th";
        }
    },
    PROGRESS_COLOUR: (percentage) => {
        // https://www.colorhexa.com/58d68d-to-e74c3c => Reverse HSV Gradient
        const ceil = Math.ceil((percentage) / 10) * 10;
        const opacity = 0.7

        switch (ceil) {
            case 0: return `rgba(255, 0, 0, ${opacity})`;
            case 10: return `rgba(255, 51, 0, ${opacity})`;
            case 20: return `rgba(255, 102, 0, ${opacity})`;
            case 30: return `rgba(255, 153, 0, ${opacity})`;
            case 40: return `rgba(255, 204, 0, ${opacity})`;
            case 50: return `rgba(255, 255, 0, ${opacity})`;
            case 60: return `rgba(204, 255, 0, ${opacity})`;
            case 70: return `rgba(153, 255, 0, ${opacity})`;
            case 80: return `rgba(102, 255, 0, ${opacity})`;
            case 90: return `rgba(51, 255, 0, ${opacity})`;
            case 100: return `rgba(0, 255, 0, ${opacity})`;
            default: "#808080"; // rgb(128,128,128) + opacity
        }
    }
}