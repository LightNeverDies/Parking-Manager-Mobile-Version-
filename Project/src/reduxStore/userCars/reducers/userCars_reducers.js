import { userCars_Success, userCars_Failed, userCars_Loading } from "../../constants/constants";

const initialState = {
    loading: false,
    error: '',
    status: 1
}

const userCars = (state = initialState, action) => {
    switch(action.type) {
        case userCars_Success:
            return { loading: false, status: action.payload.status, error: ''}
        case userCars_Failed:
            return { loading: false, status: action.payload.status, error: action.payload.error }
        case userCars_Loading:
            return initialState
        default:
            return state
    }
}

export default userCars