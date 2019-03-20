import React, {
  Component,
  useState,
  useEffect
} from 'react'

// ---------------------------------------------------------------------------

import { Search } from './search'
import { FavoriteList } from './favorite-list'
import { Recipe } from './recipe-list'

// ---------------------------------------------------------------------------

type State = {
  favorites: Recipe[],
  searchTerm: string
}

class App extends Component<{}, State> {
  state = {
    favorites: [],
    searchTerm: ''
  }

  componentDidMount () {
    this.initState()
  }

  render() {
    return (
      <div className='app-root'>
        <h1>
          You've searched for {this.state.searchTerm ? `"${this.state.searchTerm}"` : ''}
        </h1>

        <Search
          handleSearch={(term: string) => this.setState({ searchTerm: term })}
          handleOnAddFavorite={this.addFavorite}
        />

        <FavoriteList
          favorites={this.state.favorites}
          handleOnRemoveFavorite={this.removeFavorite}
        />
      </div>
    )
  }

  // -------------------------------------------------------------------------

  addFavorite = (recipe: any) => {
    const isFavorite = this.state.favorites.find((fave: Recipe) => {
      return fave.id === recipe.id
    })
    
    if (!isFavorite) {
      this.setState(({ favorites }) => ({ favorites: [...favorites, recipe] }),
      () => {
        localStorage.setItem('favorites', JSON.stringify(this.state.favorites))
      })
    }
  }

  removeFavorite = (recipe: Recipe) => {
    const newFavorites = this.state.favorites.filter((fave: Recipe) => {
      if (fave.id !== recipe.id) {
        return fave
      }
    })
    
    this.setState({ favorites: newFavorites })
  }

  initState = () => {
    const local = localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites')  || '[]')
      : []
    this.setState({ favorites: local })
  }
}

// ---------------------------------------------------------------------------

export default App
