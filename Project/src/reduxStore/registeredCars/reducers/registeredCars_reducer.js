import { registeredCars_Success, registeredCars_Failed, registeredCars_Loading} from "../../constants/constants"

const initialState = {
    loading: false,
    status: 1,
    items: 0,
    error: '',
    cars: []
}

const registeredCars = (state = initialState, action) => {
    switch(action.type) {
        case registeredCars_Success:
            return { loading: false, status: action.payload.status, items: action.payload.items, cars: action.payload.cars }
        case registeredCars_Failed: 
            return { loading: false, status: action.payload.status, error: action.payload.error }
        default:
            return state
    }
}

export default registeredCars