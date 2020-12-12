import { GET_ALL_RECIPES } from '../../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RECIPES:
      return { ...state, recipes: payload };
    default:
      break;
  }
};
