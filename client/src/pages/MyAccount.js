import React, { useContext, useEffect } from 'react';
import UserContext from '../context/user/userContext';

const MyAccount = () => {
  const userContext = useContext(UserContext);
  const { getUserInformation, user } = userContext;

  useEffect(() => {
    getUserInformation();
  }, []);
  
  return <div></div>;
};

export default MyAccount;
