import { combineReducers } from 'redux'
import register from './register/reducers/user_reducer'
import statistic from './statistic/reducers/rq_statistic'
import login from './login/reducers/findUser_reducer'
import payment from './payment/reducers/addBalance_reducers'
import userBalance from './userBalance/reducers/userBalance_reducers'
import userCars from './userCars/reducers/userCars_reducers'
import historyPayment from './history/reducers/history_reducers'
import registeredCars from './registeredCars/reducers/registeredCars_reducer'

export default reducers = combineReducers ({
    register,
    statistic,
    login,
    payment,
    userBalance,
    userCars,
    historyPayment,
    registeredCars
})