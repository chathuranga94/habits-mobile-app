import { connect } from 'react-redux';
import AddScreen from './AddScreen';
import Constants from './constants'

const mapStateToProps = (state, ownProps) => {
    console.log(state.calc.num)
    return {
        num: state.calc.num
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch({ type: Constants.INCREMENT }),
        decrement: () => dispatch({ type: Constants.DECREMENT }),
        reset: () => dispatch({ type: Constants.RESET })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    // null,
    // { context: MyContext }
)(AddScreen)
