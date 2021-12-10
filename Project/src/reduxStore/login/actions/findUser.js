import { findUser_OnLogin, findUser_Error } from '../../constants/constants'
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
                    username: result.username,
                    accountCreated: result.created
                }
            })
            const token = result.token
            AsyncStorage.setItem("token", token)
        } else {
            dispatch({
                type: findUser_Error,
                payload: {
                    logged: result.logged,
                    error: result.error
                }
            })
            try {
                AsyncStorage.removeItem(token)
                return true
            } catch(exception) {
                return false
            }
        }
    }).catch((err) => console.log(err.message))
}