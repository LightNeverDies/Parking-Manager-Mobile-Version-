import { findUser_OnLogin, findUser_Error, setCurrentUser_Auth } from '../../constants/constants'
import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const userFind = (email, password) => async (dispatch) => {
    const data = { email: email, password: password }
    await fetch(`http://192.168.1.5:3000/user/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((result) => {
        if(!result.error) {
            dispatch({
                type: findUser_OnLogin,
                payload: { 
                    logged: result.logged,
                    username: result.username
                }
            })
            const token = result.token
            AsyncStorage.setItem("token", token)
            const decoded = jwt_decode(token)
            console.log(decoded)
            // dispatch(setCurrentUser(decoded, result.username))
        } else {
            dispatch({
                type: findUser_Error,
                payload: {
                    logged: result.logged,
                    error: result.error
                }
            })
            getLogout(dispatch)
        }
    }).catch((err) => err.message)
}

export const getUserProfile = (username) => async(dispatch) => {
    await fetch(`http://192.168.1.5:3000/user/?username=${username}`)
    .then((response) => response.json()
    .then((result) => {
        console.log(result)
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

export const getLogout = async(dispatch) => {
    AsyncStorage.removeItem('token')
    dispatch(setCurrentUser({}))
}

// export const setCurrentUser = (decoded, user) => {
//     return {
//         type: setCurrentUser_Auth,
//         payload: decoded,
//         userProfile: user
//     }
// }