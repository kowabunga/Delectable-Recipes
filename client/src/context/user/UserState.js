import React, { useReducer } from 'react';
import UserReducer from './userReducer';
import UserContext from './userContext';

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  GET_USER_DATA_FAIL,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
} from '../../types';

import axios from 'axios';

const UserState = props => {
  const initialState = {
    user: {},
    loggedIn: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const { user, loggedIn } = state;

  const logInUser = async (email, password) => {
    try {
      const { data } = await axios.post('/auth', {
        email,
        password,
      });

      console.log(data);
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL });
    }
  };

  return (
    <UserContext.Provider value={{ user, loggedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
