import { errorMessage_Success, errorMessage_Finnished } from '../../constants/constants'

export const errorMessageBK = (error) => async(dispatch) => {
     const timeout = 3000

    dispatch({
        type: errorMessage_Success,
        payload: {
            error: error
        }
    })

     setTimeout(() => {
        dispatch({
            type: errorMessage_Finnished,
            payload: {
                error: ''
            }
        })
     }, timeout)
}