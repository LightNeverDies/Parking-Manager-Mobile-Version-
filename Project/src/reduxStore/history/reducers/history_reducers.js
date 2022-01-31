import { historyPayment_Success, historyPayment_Failed, historyPayment_Loading } from "../../constants/constants";

const initialState = {
    loading: false,
    error: '',
    status: 1,
    userHistory: [],
}

const historyPayment = (state = initialState, action) => {
    switch(action.type) {
        case historyPayment_Success:
            return {loading: true, status: action.payload.status, userHistory: action.payload ? action.payload.userHistory : 0}
        case historyPayment_Failed:
            return {}
        default:
            return state
    }
}

export default historyPayment