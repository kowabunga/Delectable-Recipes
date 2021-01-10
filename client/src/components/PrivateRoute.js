import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/user/userContext';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);
  const { loggedIn } = userContext;

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
