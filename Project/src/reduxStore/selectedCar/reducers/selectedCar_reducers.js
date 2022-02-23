const initialState = {
    selected: ''
}

const selectedCar = (state = initialState, action) => {
    switch(action.type) {
        case "SelectedCar": 
            return { selected: action.payload.selected }
        default:
            return state
    }
}

export default selectedCar