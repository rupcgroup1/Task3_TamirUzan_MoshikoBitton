import React from 'react'
import { createContext } from 'react';
import { useState } from 'react';

export const RecipeIngredients = createContext();

export default function RecipeIngredientsContext(props) {
  const [ingredientsList, setIngredientsList] = useState([]);

  return (
    <RecipeIngredients.Provider value={{ingredientsList, setIngredientsList}}>
      {props.children}
    </RecipeIngredients.Provider>
  )
}
