import React, { Component } from 'react'

import { Recipe } from '../recipe-list'

// ---------------------------------------------------------------------------

type FavoriteListProps = {
  favorites: Recipe[]
  handleOnRemoveFavorite: (recipe: Recipe) => void
}

const FavoriteListView = (props: FavoriteListProps) => {
  return props.favorites.length ?
    ( 
      <div className='favorites-container'>
        <div className='list'>
          <h2>Favorites:</h2>
          <ul>
            {
              props.favorites.map((recipe: Recipe, index: number) => {
                return (
                  <li key={index}>
                    {recipe.title}
                    <button
                      role='button'
                      type='button'
                      onClick={() => props.handleOnRemoveFavorite(recipe)}
                    >
                      Remove Favorite
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  : null
}

// ---------------------------------------------------------------------------

export const FavoriteList = FavoriteListView
