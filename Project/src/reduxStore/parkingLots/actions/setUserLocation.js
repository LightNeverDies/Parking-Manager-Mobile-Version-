import { parkingLots_Success, parkingLots_Failed } from "../../constants/constants"

export const setUserLocation = (lat, lon) => async (dispatch) => {
    await fetch(`http://192.168.0.103:3000/parkingLots/?lat=${lat}&lon=${lon}`)
        .then((response) => response.json()
            .then((result) => {
                if (!result.error) {
                    dispatch({
                        type: parkingLots_Success,
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: parkingLots_Failed,
                    payload: {
                        error: err
                    }
                })
            })
        )
} 