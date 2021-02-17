import {
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_REQUEST,
  GET_SINGLE_RECIPE_REQUEST,
  GET_SINGLE_RECIPE_SUCCESS,
  GET_ALL_RECIPES_FAIL,
  GET_SINGLE_RECIPE_FAIL,
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAIL,
  GET_USER_RECIPES_REQUEST,
  GET_USER_RECIPES_FAIL,
  GET_USER_RECIPES_SUCCESS,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLE_RECIPE_REQUEST:
    case GET_ALL_RECIPES_REQUEST:
    case CREATE_RECIPE_REQUEST:
    case GET_USER_RECIPES_REQUEST:
    case DELETE_RECIPE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: payload,
      };

    case GET_USER_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        userRecipes: payload,
      };

    case GET_SINGLE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipe: payload,
      };

    case CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        userRecipes: state.userRecipes.filter(recipe => recipe._id !== payload),
      };

    case GET_ALL_RECIPES_FAIL:
    case GET_SINGLE_RECIPE_FAIL:
    case CREATE_RECIPE_FAIL:
    case GET_USER_RECIPES_FAIL:
      return {
        ...state,
        recipeError: [
          ...state.recipeError,
          payload.error ? payload.error : payload.msg,
        ],
      };
    default:
      break;
  }
};
