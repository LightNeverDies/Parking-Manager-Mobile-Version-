import { getAllParkingsSpaces_Success, getAllParkingsSpaces_Failed } from '../../constants/constants'

export const parkingSpaces = (data) => async(dispatch) => {
    if(data) {
        dispatch({
            type: getAllParkingsSpaces_Success,
            payload: {
                data: data,
                error: '',
                loading: true
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
