import { findUser_OnLogin, findUser_Error, setCurrentUser_Auth } from '../../constants/constants'

const initialState = {
    loading: false,
    logged: false,
    error: '',
    username: '',
    accountCreated: '',
    email: ''
}

const findUserOnLogin = (state = initialState, action) => {
    switch(action.type) {
        case findUser_OnLogin:
            return { logged: true, loading: true, error: '', username: action.payload.username}
        case findUser_Error:
            return { logged: false, loading: false, error: action.payload.error, username: ''}
        case setCurrentUser_Auth:
            return { username: action.payload.username, error: action.payload.error, accountCreated: action.payload.accountCreated, email: action.payload.email }
        default:
            return state
    }
}

export default findUserOnLogin