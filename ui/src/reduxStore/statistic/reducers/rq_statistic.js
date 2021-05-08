import { rqStatistic } from '../../constants/constants'

const initialState = {
    data: []
}

const Statistic = (state = initialState, action) => {
    switch(action.type) {
        case rqStatistic:
            return { ...state, data: action.payload.data}
        default:
            return state
    }
}

export default Statistic