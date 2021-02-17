import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  GET_USER_DATA_FAIL,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  SET_USER_LOGGED_IN_ON_RELOAD,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_REGISTER_REQUEST:
    case GET_USER_DATA_REQUEST:
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        userError: [],
        loginError: [],
        registerError: [],
        user: {},
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        loginError: [],
        jwt: payload.token,
        userError: [],
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
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
        loginError: [],
        loggedIn: false,
        loading: false,
        jwt: null,
      };

    case GET_USER_DATA_FAIL:
      return {
        ...state,
        userError: [
          ...state.userError,
          payload.error ? payload.error : payload.msg,
        ],
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loginError: [
          ...state.loginError,
          payload.error ? payload.error : payload.msg,
        ],
      };

    case USER_REGISTER_FAIL:
      return {
        ...state,
        registerError: [
          ...state.registerError,
          payload.error ? payload.error : payload.msg,
        ],
      };

    default:
      break;
  }
};
