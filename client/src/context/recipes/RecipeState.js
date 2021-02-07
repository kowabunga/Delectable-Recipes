import React, { useReducer } from 'react';
import RecipeReducer from './recipeReducer';
import RecipeContext from './recipeContext';

import {
  GET_ALL_RECIPES_REQUEST,
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_FAIL,
  GET_SINGLE_RECIPE_REQUEST,
  GET_SINGLE_RECIPE_SUCCESS,
  GET_SINGLE_RECIPE_FAIL,
} from '../../types';

import axios from 'axios';

const RecipeState = props => {
  const initialState = {
    recipes: [],
    recipe: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  const { recipes, recipe, loading } = state;

  // Get all recipes for display
  const getAllRecipes = async () => {
    try {
      dispatch({ type: GET_ALL_RECIPES_REQUEST });
      const { data } = await axios.get('/api/recipes');
      dispatch({ type: GET_ALL_RECIPES_SUCCESS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  // Get individual recipe matching passed in recipe id from url params
  const getSingleRecipe = async id => {
    try {
      dispatch({ type: GET_SINGLE_RECIPE_REQUEST });
      const { data } = await axios.get(`/api/recipes/${id}`);
      dispatch({
        type: GET_SINGLE_RECIPE_REQUEST,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createRecipe = async recipe => {
    try {
    } catch (error) {}
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, recipe, loading, getAllRecipes, getSingleRecipe }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
