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
            default: "#808080"; // rgb(128,128,128) + opacity
        }
    }
}