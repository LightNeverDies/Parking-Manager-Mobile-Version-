import { getParkings_Success, getParkings_Failed } from '../../constants/constants'

export const getParkings = (lat, lon) => async (dispatch) => {
    await fetch(`http://192.168.1.5:3000/getParkings/?lat=${lat}&lon=${lon}`)
        .then((response) => response.json()
            .then((result) => {
                if (!result.error) {
                    dispatch({
                        type: getParkings_Success,
                        payload: {
                            status: result.status,
                            parkings: result.parkings,
                            markers: result.markers
                        }
                    })
                }
            }).catch((err) => {
                dispatch({
                    type: getParkings_Failed,
                    payload: {
                        error: err
                    }
                })
            })
        )
}