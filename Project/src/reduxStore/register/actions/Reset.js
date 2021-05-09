import { resetSettings } from '../../constants/constants'
export const Reset = () => async (dispatch) => {
    dispatch({
        type: resetSettings,
        payload: {}
    })
}