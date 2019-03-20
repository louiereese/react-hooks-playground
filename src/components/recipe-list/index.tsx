import React, { Component } from 'react'

// ---------------------------------------------------------------------------

export type Recipe = {
  id: number
  title: string

  [index: string]: any
}

type RecipeListProps = {
  recipes: Recipe[]

  handleAddFavorite: (recipe: Recipe) => void
}

const RecipeListView = (props: RecipeListProps) => {
  return ( // @TODO loader
    <div className='list'>
      <h2>Top Results:</h2>
      <ul>
        {
          props.recipes.map((recipe: Recipe, index: number) => {
            return (
            <li key={index}>
              {recipe.title}
              <button
                role='button'
                type='button'
                onClick={() => props.handleAddFavorite(recipe)}
              >Add as Favorite</button>
            </li>
            )
          })
        }
      </ul>
    </div>
  )
}

// ---------------------------------------------------------------------------

export const RecipeList = RecipeListView
