import { GET_ARTICLES } from '../../constants'

const GetArticleData = (state='', action) => {
    // const lastState = [...state.art]
    switch(action.type) {
        case GET_ARTICLES:
           // return {...state, art:[...lastState, action.payload]}
           return action.payload
        default:
            return state;
    }
}

export default GetArticleData