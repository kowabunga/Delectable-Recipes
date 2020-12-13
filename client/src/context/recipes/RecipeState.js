import React, { useReducer } from 'react';
import RecipeReducer from './recipeReducer';
import RecipeContext from './recipeContext';
import { GET_ALL_RECIPES_REQUEST, GET_ALL_RECIPES_SUCCESS } from '../../types';
import axios from 'axios';

const RecipeState = props => {
  const initialState = {
    recipes: [],
    recipe: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  const { recipes, recipe, loading } = state;

  const getAllRecipes = async () => {
    try {
      dispatch({ type: GET_ALL_RECIPES_REQUEST });
      const { data } = await axios.get('/api/recipes');
      dispatch({ type: GET_ALL_RECIPES_SUCCESS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RecipeContext.Provider value={{ recipes, recipe, loading, getAllRecipes }}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
