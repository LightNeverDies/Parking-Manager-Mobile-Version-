import { combineReducers } from 'redux'
import register from './register/reducers/user_reducer'
import statistic from './statistic/reducers/rq_statistic'

export default reducers = combineReducers ({
    register,
    statistic
})