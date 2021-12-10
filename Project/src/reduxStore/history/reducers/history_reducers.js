import { historyPayment_Success, historyPayment_Failed, historyPayment_Loading } from "../../constants/constants";

const initialState = {
    loading: true,
    error: '',
    status: 1,
    userHistory: [],
}

const historyPayment = (state = initialState, action) => {
    switch(action.type) {
        case historyPayment_Success:
            return {loading: false, status: action.payload.status, userHistory: action.payload ? action.payload.userHistory : 0}
        case historyPayment_Failed:
            return {}
        default:
            return state
    }
}

export default historyPayment