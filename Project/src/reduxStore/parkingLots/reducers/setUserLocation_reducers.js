import { parkingLots_Success, parkingLots_Failed } from "../../constants/constants"

const initialState = {
    loading: false,
    error: ''
}

const setUserLocation = (state = initialState, action) => {
    switch(action.type) {
        case parkingLots_Success:
            return {  loading: false, error: ''}
        case parkingLots_Failed:
            return { loading: false, error: action.payload.error }
        default:
            return state
    }
}

export default setUserLocation