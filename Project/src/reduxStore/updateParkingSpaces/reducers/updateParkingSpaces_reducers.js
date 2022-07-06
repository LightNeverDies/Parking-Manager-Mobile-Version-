import { getAllParkingsSpaces_Success, getAllParkingsSpaces_Failed, getAllParkingsSpaces_UpdateSingle } from '../../constants/constants'

const initialStateParkings = {
    data: [],
    error: '',
    loading: false
}

const getAllParkingsSpaces = (state = initialStateParkings, action) => {
    switch(action.type) {
        case getAllParkingsSpaces_Success:
            return {data: action.payload.data, error: '', loading: action.payload.loading}
        case getAllParkingsSpaces_UpdateSingle:
            if(state.data) {
                return {
                    data: state.data.map((element) => {
                        return element.id === action.payload.data.placeId ?
                            { ...element, status: action.payload.data.status }
                            : element
                    }),
                    loading: true
                }
            }
        case getAllParkingsSpaces_Failed:
            return {data: [], error: action.payload.error, loading:action.payload.loading}
        default:
            return state
    }
}

export default getAllParkingsSpaces
