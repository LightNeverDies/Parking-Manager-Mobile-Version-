export const selectedCar = (selectedCar) => async (dispatch) => {
    if(selectedCar != undefined) {
        dispatch({
            type: "SelectedCar",
            payload: {
                selected: selectedCar
            }
        })
    }
}