import CONSTANTS from './constants'

const INITIAL_STATE2 = { num: 2 }

export default function calc(state = INITIAL_STATE2, action) {
    console.log(action)
    switch (action.type) {
        case CONSTANTS.INCREMENT:
            return { ...state, num: state.num + 1 }
        case CONSTANTS.DECREMENT:
            return { ...state, num: state.num - 1 }
        case CONSTANTS.RESET:
            return { ...state, num: 0 }
        default:
            return state
    }
}
