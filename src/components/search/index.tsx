import React, {
  Component,
  useEffect,
  useState
} from 'react'

// ---------------------------------------------------------------------------

import { fetchData } from '../../api'
import { RecipeList } from '../recipe-list'

// ---------------------------------------------------------------------------

type SearchProps = {
  handleSearch: (searchTerm: string) => void
  handleOnAddFavorite: (arg: any) => void
}

const SearchView = (props: SearchProps) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchData(query, setRecipes, setError)
    props.handleSearch(searchTerm)
  }, [query])

  // -------------------------------------------------------------------------

  return (
    <div className='search-container'>
       <form
         onReset={() => {
           setSearchTerm('') // is this async? no callback like this.setState
           setQuery('')
           props.handleSearch('')
         }}
         onSubmit={(e: React.FormEvent) => e.preventDefault()}
       >
         <input
           placeholder={'Let\'s find a recipe!'}
           onChange={(e: React.FormEvent<HTMLInputElement>) => {
             setSearchTerm(e.currentTarget.value)
           }}
         />

        <div className='button-group'>
          <button
             role='button'
             type='submit'
             onClick={() => {
              setQuery(searchTerm)
              props.handleSearch(searchTerm)
             }}
           >
             Search
           </button>

           <button
             role='button'
             type='reset'
           >
            Clear
          </button>
        </div>
       </form>

       {
          query && !error
            ? <RecipeList
                recipes={recipes}
                handleAddFavorite={props.handleOnAddFavorite}
              /> 
            : null
       }

       {
          error &&
          <h3 className='error'>Oops, we've encountered a problem, try a different search</h3>
       }
    </div>
  );
}

// ---------------------------------------------------------------------------

export const Search = SearchView

// @see https://reactjs.org/docs/hooks-state.html
// pass initial state to `useState`, returns 2 values: [currentState, fn to update]
// (If we wanted to store two different values in state, we would call useState() twice.)

// @see https://reactjs.org/docs/hooks-effect.html
// Why is useEffect called inside a component? Placing useEffect inside the
// component lets us access the count state variable (or any props) right
// from the effect. We don’t need a special API to read it — it’s already in
// the function scope. Hooks embrace JavaScript closures and avoid introducing
// React-specific APIs where JavaScript already provides a solution.

