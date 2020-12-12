import React, { useReducer } from 'react';
import RecipeReducer from './recipeReducer';
import RecipeContext from './recipeContext';
import { GET_ALL_RECIPES } from '../../types';
import axios from 'axios';

const RecipeState = props => {
  const initialState = {
    recipes: [],
  };

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  const { recipes } = state;

  const getAllRecipes = async () => {
    try {
      const { data } = await axios.get('/api/recipes');
      dispatch({ type: GET_ALL_RECIPES, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RecipeContext.Provider value={{ recipes, getAllRecipes }}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
