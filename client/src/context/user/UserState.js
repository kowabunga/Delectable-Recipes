import React, { useReducer } from 'react';
import UserReducer from './userReducer';
import UserContext from './userContext';

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

import axios from 'axios';

const UserState = props => {
  const initialState = {
    user: {},
    loginError: {},
    loggedIn: false,
    loading: false,
    jwt: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const { user, loggedIn, loading, loginError, jwt } = state;

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

      dispatch({ type: USER_LOGIN_SUCCESS });

      // set jwt in local storage
      if (localStorage.getItem('delec_recipe_jwt') === null) {
        localStorage.setItem('delec_recipe_jwt', data.token);
      }
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error });
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
      console.log('Ran');

      dispatch({ type: GET_USER_DATA_REQUEST });

      if (!jwt && localStorage.getItem('delec_recipe_jwt') !== null) {
        let jwt = localStorage.getItem('delec_recipe_jwt');

        const { data } = await axios.get('/api/users', {
          headers: {
            'x-auth-token': jwt,
          },
        });

        dispatch({ type: GET_USER_DATA_SUCCESS, payload: data });
      } else {
        dispatch({ type: GET_USER_DATA_FAIL, payload: 'User not logged in' });
      }
    } catch (error) {
      dispatch({ type: GET_USER_DATA_FAIL, payload: error });
    }
  };

  // Checks for existance of jwt. If so, gets appropriate information to ensure user's previous logged in state remains after reload
  const setUserLoggedIn = () => {
    if (localStorage.getItem('delec_recipe_jwt') !== null)
      dispatch({
        type: SET_USER_LOGGED_IN_ON_RELOAD,
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loggedIn,
        loading,
        loginError,
        jwt,
        logInUser,
        logoutUser,
        setUserLoggedIn,
        getUserInformation,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
