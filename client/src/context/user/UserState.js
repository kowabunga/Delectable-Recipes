import React, { useReducer } from 'react';
import UserReducer from './userReducer';
import UserContext from './userContext';

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  GET_USER_DATA_FAIL,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  SET_USER_LOGGED_IN_ON_RELOAD,
  GET_USER_RECIPES_REQUEST,
  GET_USER_RECIPES_SUCCESS,
  GET_USER_RECIPES_FAIL,
} from '../../types';

import axios from 'axios';

const UserState = props => {
  const initialState = {
    user: {},
    loginError: null,
    loggedIn: false,
    loading: false,
    jwt: null,
    userError: null,
    registerError:null
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const {
    user,
    loggedIn,
    loading,
    loginError,
    jwt,
    userError,
    registerError,
  } = state;

  const logInUser = async (email, password) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const { data } = await axios.post(
        '/api/auth',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // set jwt in local storage
      localStorage.setItem('delec_recipe_jwt', data.token);
      console.log('token set');

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const logoutUser = () => {
    dispatch({ type: USER_LOGOUT_SUCCESS });

    if (localStorage.getItem('delec_recipe_jwt') !== null) {
      localStorage.removeItem('delec_recipe_jwt');
    }
  };

  const getUserInformation = async () => {
    try {
      dispatch({ type: GET_USER_DATA_REQUEST });

      const { data } = await axios.get('/api/users', {
        headers: {
          'x-auth-token': jwt,
        },
      });

      dispatch({ type: GET_USER_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_USER_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // Checks for existance of jwt. If so, gets appropriate information to ensure user's previous logged in state remains after reload
  const setUserLoggedIn = () => {
    if (localStorage.getItem('delec_recipe_jwt') !== null)
      dispatch({
        type: SET_USER_LOGGED_IN_ON_RELOAD,
      });
  };

  const getUserRecipes = async () => {
    try {
      dispatch({ type: GET_USER_RECIPES_REQUEST });
      const { data } = await axios.get('api/users/recipes');

      dispatch({ type: GET_USER_RECIPES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_USER_RECIPES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      //@TODO add front end validation for password and confirm password
      dispatch({ type: USER_REGISTER_REQUEST });
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        jwt,
        user,
        loggedIn,
        loading,
        loginError,
        userError,
        registerError,
        logInUser,
        logoutUser,
        registerUser,
        setUserLoggedIn,
        getUserInformation,
        getUserRecipes,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
