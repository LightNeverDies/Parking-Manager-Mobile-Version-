import { registeredCars_Success, registeredCars_Failed, registeredCars_Loading} from "../../constants/constants"

export const registeredCars = (username) => async (dispatch) => {
    await fetch(`http://192.168.0.103:3000/user/registeredCars/?username=${username}`, {
        method: "POST"
    })
    .then((response) => response.json()
    .then((result) => {
        if(!result.error) {
            dispatch({
                type: registeredCars_Success,
                payload: {
                    status: result.status,
                    cars: result.cars,
                    items: result.items
                }
            })
        } else {
            dispatch({
                type: registeredCars_Failed,
                payload: {
                    status: result.status,
                    error: result.error
                }
            })
            setTimeout(() => {
                dispatch({ type: registeredCars_Loading })
            }, 1500)
        }
    }))
}