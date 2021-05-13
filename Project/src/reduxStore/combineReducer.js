import { combineReducers } from 'redux'
import register from './register/reducers/user_reducer'
import statistic from './statistic/reducers/rq_statistic'
import login from './login/reducers/findUser_reducer'

export default reducers = combineReducers ({
    register,
    statistic,
    login
})