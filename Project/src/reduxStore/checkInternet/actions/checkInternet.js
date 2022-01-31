export const checkInternet = (status) => async(dispatch) => {
    dispatch({
        type: 'Status',
        payload:{
            status: status
        }
    })
}