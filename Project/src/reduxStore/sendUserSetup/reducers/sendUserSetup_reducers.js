import { userSetupLoader_True, userSetupLoader_False, userSetupLoader_Finnished } from '../../constants/constants'

const initialStateUserSetup = {
    statusLoader: false,
    errorMessage: ''
}

const sendUserSetup = (state = initialStateUserSetup, action) => {
    switch(action.type) {
        case userSetupLoader_True:
            return { statusLoader: action.payload.statusLoader, errorMessage: action.payload.errorMessage }
        case userSetupLoader_False:
            return { statusLoader: action.payload.statusLoader, errorMessage: action.payload.errorMessage }
        case userSetupLoader_Finnished:
            return { statusLoader: action.payload.statusLoader, errorMessage: action.payload.errorMessage }
        default:
            return state
    }
}

export default sendUserSetup