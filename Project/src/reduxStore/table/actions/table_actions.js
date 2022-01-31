export const sortedTable = (sorted) => (dispatch) => {
    dispatch({
        type: "Sorted",
        payload: {
            sorted: sorted
        }
    })
}

export const setType = (type) => (dispatch) => {
    dispatch({
        type: "Type",
        payload: type
    })
}
