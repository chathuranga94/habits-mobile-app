import CONSTANTS from './constants'

const HABITS_STORE = { habits: [] }

export default function calc(state = HABITS_STORE, action) {
    console.log(action)
    switch (action.type) {
        case CONSTANTS.INCREMENT:
            return { ...state, num: state.num + 1 }
        default:
            return state
    }
}
