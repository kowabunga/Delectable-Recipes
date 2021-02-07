import {
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_REQUEST,
  GET_SINGLE_RECIPE_REQUEST,
} from '../../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RECIPES_REQUEST:
      return { ...state, loading: true };

    case GET_ALL_RECIPES_SUCCESS:
      return { ...state, loading: false, recipes: payload };

    case GET_SINGLE_RECIPE_REQUEST:
      return {
        ...state,
        loading: false,
        recipe: payload,
      };
    default:
      break;
  }
};
//@TODO Have to finish recipe creation and finish recipe reducer stuff. Mongo db's being stupid
