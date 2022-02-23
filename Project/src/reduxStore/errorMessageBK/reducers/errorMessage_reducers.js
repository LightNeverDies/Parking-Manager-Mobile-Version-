import { errorMessage_Success, errorMessage_Finnished } from '../../constants/constants'

const initialState = {
    error: ''
}

const errorMessage = (state = initialState, action) => {
    switch(action.type){
        case errorMessage_Success:
            return { error: action.payload.error }
        case errorMessage_Finnished:
            return { error: action.payload.error }
        default:
            return state
    }
}

export default errorMessage