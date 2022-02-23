import { combineReducers } from 'redux'
import register from './register/reducers/user_reducer'
import statistic from './statistic/reducers/rq_statistic'
import login from './login/reducers/findUser_reducer'
import payment from './payment/reducers/addBalance_reducers'
import userBalance from './userBalance/reducers/userBalance_reducers'
import userCars from './userCars/reducers/userCars_reducers'
import historyPayment from './history/reducers/history_reducers'
import registeredCars from './registeredCars/reducers/registeredCars_reducer'
import checkBox from './checkBox/reducers/checkBox_reducers'
import setUserLocation from './parkingLots/reducers/setUserLocation_reducers'
import sortedTable from './table/reducers/table_reducers'
import checkInternet from './checkInternet/reducers/checkInternet_reducers'
import getParkings from './getParkings/reducers/getParkings_reducers'
import selectedCar from './selectedCar/reducers/selectedCar_reducers'
import getAllParkingsSpaces from './updateParkingSpaces/reducers/updateParkingSpaces_reducers'
import sendUserSetup from './sendUserSetup/reducers/sendUserSetup_reducers'
import errorMessage from './errorMessageBK/reducers/errorMessage_reducers'
import timerSetup from './timerSetup/reducers/timerSetup_reducers'

export default reducers = combineReducers ({
    register,
    statistic,
    login,
    payment,
    userBalance,
    userCars,
    historyPayment,
    registeredCars,
    checkBox,
    setUserLocation,
    sortedTable,
    checkInternet,
    getParkings,
    selectedCar,
    getAllParkingsSpaces,
    sendUserSetup,
    errorMessage,
    timerSetup
})