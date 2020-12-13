import { GET_ALL_RECIPES_SUCCESS, GET_ALL_RECIPES_REQUEST } from '../../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RECIPES_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_RECIPES_SUCCESS:
      return { ...state, loading: false, recipes: payload };
    default:
      break;
  }
};
