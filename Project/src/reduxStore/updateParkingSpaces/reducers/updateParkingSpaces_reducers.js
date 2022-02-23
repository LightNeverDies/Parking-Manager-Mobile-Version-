import { getAllParkingsSpaces_Success, getAllParkingsSpaces_Failed } from '../../constants/constants'

const initialStateParkings = {
    data: [],
    error: '',
    loading: false
}

const getAllParkingsSpaces = (state = initialStateParkings, action) => {
    switch(action.type) {
        case getAllParkingsSpaces_Success:
            return {data: action.payload.data, error: '', loading: action.payload.loading}
        case getAllParkingsSpaces_Failed:
            return {data: [], error: action.payload.error, loading:action.payload.loading}
        default:
            return state
    }
}

export default getAllParkingsSpaces
