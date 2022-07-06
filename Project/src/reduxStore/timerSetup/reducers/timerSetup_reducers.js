import { timerSetup_Success, timerSetup_Finnished } from '../../constants/constants'

const initialState = {
    timer: [],
    status: false
}

const timerSetup = (state = initialState, action) => {
    switch(action.type) {
        case timerSetup_Success:
            const key = Object.keys(action.payload)
            if(state.timer?.some((x) => key[0] in x)) {
                const keyToString = key.toString()
                const status = action.payload[keyToString].status
                const setupTimer = state.timer?.map((keyPair) => key[0] in keyPair ? {
                    [keyToString]: { 
                        timerSetup: action.payload[keyToString].timerSetup
                    }
                } 
                : keyPair)
                return {
                    status: status,
                    timer: setupTimer
                }
            } else {
                const key = Object.keys(action.payload)
                const keyToString = key.toString()
                return {...state, timer: [...state.timer, action.payload], status: action.payload[keyToString].status }
            }
        case timerSetup_Finnished:
            // should think about good solution for end timer
            // maybe a new method for extend time
            return state
            //return { placeId: action.payload.placeId, hours: action.payload.hours, minutes: action.payload.minutes, seconds: action.payload.seconds, status: action.payload.status }
        default:
            return state
    }
}

export default timerSetup