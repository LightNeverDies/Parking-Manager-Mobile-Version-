import { userBalance_Success, userBalance_Failed } from "../../constants/constants";

const initialState = {
    loading: false,
    error: '',
    status: '',
    username: '',
    balance: ''
}

const userBalance = (state = initialState, action) => {
    switch(action.type) {
        case userBalance_Success:
            return { loading: true, status: action.payload.status, username: action.payload.username, balance: action.payload.balance }
        case userBalance_Failed:
            return {}
        default:
            return state
    }
}

export default userBalance