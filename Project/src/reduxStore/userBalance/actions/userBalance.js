import { userBalance_Success, userBalance_Failed } from "../../constants/constants";

export const userBalance = (username) => async (dispatch) => {
    console.log(username)
    await fetch(`http://192.168.0.103:3000/user/balance/?username=${username}`)
    .then((response) => response.json()
    .then((result) => {
        if(!result.error) {
            dispatch({
                type: userBalance_Success,
                payload: {
                    username: result.username,
                    balance: result.balance,
                    status: result.status
                }
            })
        } else {
            dispatch({
                type: userBalance_Failed,
                payload: {
                    error: result.error
                }
            })
        }
    }))
    .catch((err) => err.message)
}