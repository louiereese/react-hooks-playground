import axios from 'axios'

// ---------------------------------------------------------------------------

const baseUri = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=10&offset=0&type=main+course&query='
const axiosConfig = axios.create({ baseURL: baseUri, headers: { 'X-RapidAPI-Key': process.env.API_KEY } })

type ResponseObject<T = any> = {
  data: { results: T }
}

const extract = ({ data }: ResponseObject) => data.results

// ---------------------------------------------------------------------------

export const fetchData = (searchTerm: string, setResults: (args: any[]) => void, setError: (message: string) => void) => {
  if (!searchTerm) {
    return null
  }

  return axios(`${baseUri}${searchTerm}`, {
    headers: {
      'X-RapidAPI-Key': 'd9f382843emshf266670394f92f3p1f8627jsn63bc5cadd4e4',
      'Content-Type': 'application/json'
    }
  })
    .then(extract)
    .then(setResults)
    .catch(setError)
}
