import { GET_ARTICLES } from '../../constants'
const URL = `https://jsonplaceholder.typicode.com/`

export const getArticles = () => async (dispatch) => {
  // console.log('??ss')
  await fetch(`${URL}posts`)
       .then((response) => response.json())
       .then((result) => {
           // console.log('Result', result)
           dispatch({
               type: GET_ARTICLES,
               payload: result
           })
       })
       .catch((err) => console.error(err.message))
}
