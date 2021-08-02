import { setCurrentUser_Auth } from '../../constants/constants'

export const getUserProfile = (username) => async(dispatch) => {
    await fetch(`http://192.168.1.5:3000/user/?username=${username}`)
    .then((response) => response.json()
    .then((result) => {
        dispatch({
            type: setCurrentUser_Auth,
            payload: {
                username: result.username,
                email: result.email,
                accountCreated: result.dataCreated
            }
        })
    })).catch((err) => err.message)
}