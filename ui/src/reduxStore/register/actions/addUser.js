import { userRegister_Success, userRegister_Exists } from '../../constants/constants'

export const addUser = (username, password, email) => async (dispatch) => {
    await fetch(`http://192.168.1.5:3000/user/?username=${username}&password=${password}&email=${email}`)
    .then((response) => response.json()
    .then((result) => {
        console.log(result)
        if(!result.error) {
            dispatch ({
                type: userRegister_Success,
                payload: { username: result.username,
                        status: result.status,
                }
            })
        } else {
            dispatch({
                type: userRegister_Exists,
                payload: { error: result.error, 
                        username: result.username, 
                        email: result.email,
                        status: result.status}
            })
        }
    }))
    .catch((err) => err.message)
    //     dispatch({
    //     type: userRegister_Failed,
    //     payload: { error: err.message }
    // }))
}
