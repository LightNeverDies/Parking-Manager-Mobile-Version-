import { checkedChanged } from "../../constants/constants"

const initialState = {
    checked: false
}

const checkBox = (state = initialState, action) => {
    switch(action.type) {
        case checkedChanged:
            return { checked: action.payload.checked }
        default:
            return state
    }
}

export default checkBox