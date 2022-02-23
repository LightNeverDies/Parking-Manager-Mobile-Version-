import { rqStatistic } from '../../constants/constants'


export const requestStatistic = () => async (dispatch) => {
    await fetch(`http://192.168.1.2:3000/statistic/`)
    .then((response) => response.json()
    .then((result) => {
        dispatch ({
            type: rqStatistic,
            payload: { 
                data: result.data
            }
        })
    }))
    .catch((err) => err.message)

}