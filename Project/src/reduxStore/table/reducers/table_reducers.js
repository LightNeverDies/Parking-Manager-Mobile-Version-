
const initialState = {
    sorted: null,
    type: '',
    status: 'loading'
}

const sortedTable = (state = initialState, action) => {
    switch(action.type) {
        case "Sorted": 
            return { status: 'success', sorted: action.payload.sorted }
        case "Type":
            return { status: 'success', type: action.payload }
        case "Load":
            return initialState
        default: 
            return state
    }
}

export default sortedTable