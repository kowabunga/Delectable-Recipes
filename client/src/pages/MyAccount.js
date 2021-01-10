import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserContext from '../context/user/userContext';

const MyAccount = () => {
  const userContext = useContext(UserContext);
  const {
    getUserInformation,
    user: { name, email },
    loading,
    jwt,
  } = userContext;

  useEffect(() => {
    jwt !== null && getUserInformation();
  }, [jwt]);

  return (
    <Row className='justify-content-center'>
      {loading ? (
        <Spinner animation='border'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      ) : (
        <>
          <Row className='p-2'>
            <Col xs={3} className='justify-content-start align-items-center br'>
              <Link to='/account/edit'>Edit Information</Link>
              <br />
              <Link to='/account/recipes'>My Recipes</Link>
            </Col>
            <Col xs={9} className='justify-content-start'>
              <h1>Welcome {name}</h1>
            </Col>
          </Row>
        </>
      )}
    </Row>
  );
};

export default MyAccount;
