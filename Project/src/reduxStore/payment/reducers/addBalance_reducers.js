import { addPayment_Success, addPayment_Failed } from "../../constants/constants";

const initialState = {
    loading: false,
    error: '',
    status: '',
    username: '',
}

const addBalance = (state = initialState, action) => {
    switch(action.type) {
        case addPayment_Success:
            return { loading: true, status: action.payload.status, username: action.payload.username}
        case addPayment_Failed:
            return {}
        default: 
            return state
    }
}

export default addBalance