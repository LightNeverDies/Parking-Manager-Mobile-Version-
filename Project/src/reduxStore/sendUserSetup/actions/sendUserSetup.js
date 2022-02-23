import { userSetupLoader_True, userSetupLoader_False, userSetupLoader_Finnished } from '../../constants/constants'

export const sendUserSetup = (userSetup, socket, selected) => async(dispatch) => {
    const timeOut = 3000
    if(selected != '') {
        dispatch({
            type: userSetupLoader_True,
            payload: {
                statusLoader: true,
                errorMessage: ''
            }
        })

        setTimeout(() => {
            socket.emit('parkingLotsChanged', userSetup)
            dispatch({
                type: userSetupLoader_Finnished,
                payload: {
                    statusLoader: false,
                    errorMessage: ''
                }
            })
        }, timeOut)

    } else {
        dispatch({
            type: userSetupLoader_False,
            payload: {
                statusLoader: true,
                errorMessage: 'Select car before continue!'
            }
        })

        setTimeout(() => {
            dispatch({
                type: userSetupLoader_Finnished,
                payload: {
                    statusLoader: false,
                    errorMessage: ''
                }
            })
        }, timeOut)
    }
}
