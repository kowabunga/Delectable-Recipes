import React, { useReducer, useContext } from 'react';
import RecipeReducer from './recipeReducer';
import RecipeContext from './recipeContext';

import {
  GET_ALL_RECIPES_REQUEST,
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_FAIL,
  GET_SINGLE_RECIPE_REQUEST,
  GET_SINGLE_RECIPE_SUCCESS,
  GET_SINGLE_RECIPE_FAIL,
  CREATE_RECIPE_FAIL,
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS,
} from '../../types';

import axios from 'axios';

const RecipeState = props => {
  const initialState = {
    recipes: [],
    recipe: {},
    loading: false,
    recipeError: [],
  };

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  const { recipes, recipe, loading, recipeError } = state;

  // Get all recipes for display
  const getAllRecipes = async () => {
    try {
      dispatch({ type: GET_ALL_RECIPES_REQUEST });
      const { data } = await axios.get('/api/recipes');
      dispatch({ type: GET_ALL_RECIPES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_RECIPES_FAIL,
        payload: error.response && error.response.data,
      });
    }
  };

  // Get individual recipe matching passed in recipe id from url params
  const getSingleRecipe = async id => {
    try {
      dispatch({ type: GET_SINGLE_RECIPE_REQUEST });
      const { data } = await axios.get(`/api/recipes/${id}`);
      dispatch({
        type: GET_SINGLE_RECIPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_RECIPE_FAIL,
        payload: error.response && error.response.data,
      });
    }
  };

  const createRecipe = async (recipe, name) => {
    try {
      console.log(name);
      dispatch({ type: CREATE_RECIPE_REQUEST });
      const { data } = await axios.post(
        '/api/recipes',
        { recipe, userName:name },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('delec_recipe_jwt'),
          },
        }
      );
      return true;
    } catch (error) {
      dispatch({
        type: CREATE_RECIPE_FAIL,
        payload: error.response && error.response.data,
      });
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        recipe,
        loading,
        recipeError,
        getAllRecipes,
        getSingleRecipe,
        createRecipe,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
