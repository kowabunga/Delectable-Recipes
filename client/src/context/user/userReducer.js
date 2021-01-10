import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  GET_USER_DATA_FAIL,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  SET_USER_LOGGED_IN_ON_RELOAD,
} from '../../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_DATA_REQUEST:
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        loginError: {},
        jwt: payload.token,
      };

    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case SET_USER_LOGGED_IN_ON_RELOAD:
      return {
        ...state,
        loggedIn: true,
        jwt: localStorage.getItem('delec_recipe_jwt'),
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        loginError: {},
        loggedIn: false,
        loading: false,
        jwt: null,
      };

    case GET_USER_DATA_FAIL:
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loginError: payload,
      };

    default:
      break;
  }
};
