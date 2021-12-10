import { userCars_Success, userCars_Failed, userCars_Loading } from "../../constants/constants"

export const userCars = (username, carNumber) => async (dispatch) => {
    await fetch(`http://192.168.1.5:3000/user/cars/?username=${username}&carNumber=${carNumber}`)
    .then((response) => response.json()
    .then((result) => {
        if(!result.error) {
            dispatch({
                type: userCars_Success,
                payload: {
                    status: result.status
                }
            })
            setTimeout(() => {
                dispatch({ type: userCars_Loading })
            }, 1500)
        } else {
            dispatch({
                type: userCars_Failed,
                payload: {
                    status: result.status,
                    error: result.error
                }
            })
            setTimeout(() => {
                dispatch({ type: userCars_Loading })
            }, 1500)
        }
    }))
    .catch((err) => err.message)
}