import { userRegister_Failed, userRegister_Success, userRegister_Exists, resetSettings } from '../../constants/constants'

const initialState = {
    loading:false,
    error: '',
    status: '',
    username: '',
    email: ''
}

const UserRequest = (state = initialState , action) => {
    switch(action.type) {
        case userRegister_Success:
            return { loading: true, status: action.payload.status, error: action.payload.error, username: action.payload.username}
        case userRegister_Failed:
            return {}
        case userRegister_Exists:
            return { loading: false, status: action.payload.status, error: action.payload.error, username: action.payload.username, email: action.payload.email}
        case resetSettings:
            return initialState    
        default:
            return state
    }
}
export default UserRequest