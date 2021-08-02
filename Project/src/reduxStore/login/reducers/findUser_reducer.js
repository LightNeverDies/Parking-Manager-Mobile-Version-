import { findUser_OnLogin, findUser_Error } from '../../constants/constants'

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
            return { logged: true, loading: true, error: '', username: action.payload.username, accountCreated: action.payload.accountCreated}
        case findUser_Error:
            return { logged: false, loading: false, error: action.payload.error, username: ''}
        default:
            return state
    }
}

export default findUserOnLogin