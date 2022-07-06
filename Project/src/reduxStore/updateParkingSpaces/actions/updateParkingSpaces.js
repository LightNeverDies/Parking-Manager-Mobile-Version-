import { getAllParkingsSpaces_Success, getAllParkingsSpaces_Failed, getAllParkingsSpaces_UpdateSingle } from '../../constants/constants'

export const parkingSpaces = (data) => async(dispatch) => {
    const timeout = 3000
    if(Array.isArray(data)) {
        dispatch({
            type: getAllParkingsSpaces_Success,
            payload: {
                data: data,
                error: '',
                loading: true
            } 
        })

    } else if(data) {
        dispatch({
            type: getAllParkingsSpaces_UpdateSingle,
            payload: {
                data: data
            }
        })
    } else {
        dispatch({
            type: getAllParkingsSpaces_Failed,
            payload: {
                data: [],
                error: 'No Information Available',
                loading: true
            }
        })
    }
}
