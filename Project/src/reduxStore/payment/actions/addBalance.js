import { addPayment_Success, addPayment_Failed } from "../../constants/constants";

export const addBalance = ( username, card_number, first_name, last_name, security_code, exp_date, type, funds) => async (dispatch) => {
    await fetch(`http://192.168.1.2:3000/user/payment/?username=${username}&card_number=${card_number}&first_name=${first_name}&last_name=${last_name}&security_code=${security_code}&exp_date=${exp_date}&type=${type}&funds=${funds}`)
    .then((response) => response.json()
    .then((result) => {
        if(!result.error) {
            dispatch({
                type: addPayment_Success,
                payload: {
                    username: result.username,
                    status: result.status,
                }
            })
        } else {
            dispatch({
                type: addPayment_Failed,
                payload: {
                    error: result.error
                }
            })
        }
    }))
    .catch((err) => err.message)
}