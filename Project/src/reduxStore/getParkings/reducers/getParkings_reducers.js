import { getParkings_Success, getParkings_Failed } from '../../constants/constants'

const initialState = {
    loading: false,
    status: '',
    parkings: '0',
    markers: '',
    error: ''
}

const getParkings = (state = initialState, action) => {
    switch(action.type) {
        case getParkings_Success: 
            return { loading: false, error: '', parkings: action.payload.parkings, status: action.payload.status, markers: action.payload.markers }
        case getParkings_Failed:
            return { loading: false, error: action.payload.error, parkings: '', status: action.payload.status, markers: '' }
        default: 
            return state
    }
}

export default getParkings