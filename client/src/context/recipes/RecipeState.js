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
  CREATE_RECIPE_FAIL,
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAIL,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
  GET_USER_RECIPES_REQUEST,
  GET_USER_RECIPES_SUCCESS,
  GET_USER_RECIPES_FAIL,
} from '../../types';

import axios from 'axios';

const RecipeState = props => {
  const initialState = {
    recipes: [],
    userRecipes: [],
    recipe: {},
    loading: false,
    recipeError: [],
    recipeCreated: false,
  };

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  const {
    recipes,
    userRecipes,
    recipe,
    loading,
    recipeError,
    recipeCreated,
  } = state;

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

  // Get all recipes belonging to the logged in  user
  const getUserRecipes = async jwt => {
    try {
      dispatch({ type: GET_USER_RECIPES_REQUEST });
      const { data } = await axios.get('/api/users/recipes', {
        headers: {
          'x-auth-token': jwt,
        },
      });
      console.dir(data);
      dispatch({ type: GET_USER_RECIPES_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_USER_RECIPES_FAIL,
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

  const createRecipe = async (recipe, name, jwt) => {
    try {
      console.log(name);
      dispatch({ type: CREATE_RECIPE_REQUEST });
      await axios.post(
        '/api/recipes',
        { recipe, userName: name },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': jwt,
          },
        }
      );
      dispatch({ type: CREATE_RECIPE_SUCCESS });
      return true;
    } catch (error) {
      dispatch({
        type: CREATE_RECIPE_FAIL,
        payload: error.response && error.response.data,
      });
    }
  };

  const deleteRecipe = async (id, jwt) => {
    try {
      dispatch({ type: DELETE_RECIPE_REQUEST });
      await axios.delete(`/api/recipes/${id}`, {
        headers: {
          'x-auth-token': jwt,
        },
      });

      dispatch({ type: DELETE_RECIPE_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_RECIPE_FAIL,
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
        recipeCreated,
        userRecipes,
        getAllRecipes,
        getSingleRecipe,
        createRecipe,
        getUserRecipes,
        deleteRecipe,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
