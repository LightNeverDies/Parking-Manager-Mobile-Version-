
const initialState = {
    status: null
}

const checkInternet = (state=initialState, action) => {
    switch(action.type) {
        case "Status":
            return { status: action.payload.status }
        default:
            return state
    }
}

export default checkInternet