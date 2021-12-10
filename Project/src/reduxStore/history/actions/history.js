import { historyPayment_Success, historyPayment_Failed, historyPayment_Loading} from "../../constants/constants";

export const history = (username) => async(dispatch) => {
    await fetch(`http://192.168.1.5:3000/user/history/?username=${username}`)
    .then((response) => response.json()
    .then((result) => {
        if(!result.error) {
            dispatch({
                type: historyPayment_Success,
                payload:{
                    userHistory: result.userHistory,
                    status: result.status
                }
            })
        } else {
            dispatch({
                type: historyPayment_Failed,
                payload: {
                    error: result.error
                }
            })
        }
    }))
    .catch((err) => err.message)
}