import { checkedChanged } from "../../constants/constants"

export const checkBoxResult = (checked) => async (dispatch) => {
    dispatch({
        type: checkedChanged,
        payload: {
            checked: checked
        }
    })
}