import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/button';
import UserContext from '../context/user/userContext';

const MyAccountPage = () => {
  const userContext = useContext(UserContext);
  const {
    getUserInformation,
    user: { name, email },
    loading,
    jwt,
    userError,
    logoutUser,
  } = userContext;

  useEffect(() => {
    jwt !== null && getUserInformation();
  }, [jwt]);

  // If usererror - i.e. can't get user info such as if user has been deleted, logout and return to login
  useEffect(() => {
    userError.length > 0 && logoutUser();
  }, [userError]);

  return (
    <Row className='justify-content-center'>
      {loading ? (
        <Spinner animation='border'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      ) : (
        <>
          <div className='mb-3'>
            <p className='h3 text-center'>
              Have something you want to share? A recipe to warm the heart?
            </p>
            <LinkContainer to='/recipes/create'>
              <Button className='mt-2' variant='info' size='sm' block>
                Create Your Recipe
              </Button>
            </LinkContainer>
          </div>

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

export default MyAccountPage;
