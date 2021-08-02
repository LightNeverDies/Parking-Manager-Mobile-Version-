import { setAccountInformation, setAccountError } from '../../constants/constants'

const initialState = {
    loading: false,
    logged: false,
    error: '',
    username: '',
    accountCreated: '',
    email: ''
}

const accountInfo = (state = initialState, action) => {
    switch(action.type) {
        case setAccountInformation:
            return { username: action.payload.username, error: action.payload.error, accountCreated: action.payload.accountCreated, email: action.payload.email }
        case setAccountError:
            return { error: action.payload.error }
        default:
            return state
    }
}

export default accountInfo