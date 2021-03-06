import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import UserContext from '../context/user/userContext';

const LoginPage = ({ history }) => {
  const userContext = useContext(UserContext);
  const { logInUser, loggedIn, loginError, userError } = userContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = e => {
    e.preventDefault();

    logInUser(email, password);
  };

  useEffect(() => {
    loggedIn && history.push('/account');
  }, [loggedIn,history]);

  return (
    <>
      {userError.length > 0 && (
        <Alert variant='danger'>
          Something went wrong. Please login again.
        </Alert>
      )}

      {loginError.length > 0 &&
        loginError.map((error, idx) => (
          <Alert key={idx} variant='danger'>
            {error}.
          </Alert>
        ))}

      <Row className='justify-content-center'>
        <Col lg={3} md={2}></Col>
        <Col lg={6} md={8}>
          <Form className='mt-3'>
            <FormGroup controlId='email'>
              <FormLabel>Email</FormLabel>
              <FormControl
                type='email'
                placeholder='Enter email...'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='password'>
              <FormLabel>Password</FormLabel>
              <FormControl
                type='password'
                placeholder='Enter password...'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button
              variant='outline-primary'
              type='button'
              onClick={e => login(e)}
            >
              Login
            </Button>
          </Form>
        </Col>
        <Col lg={3} md={2}></Col>
      </Row>
      <Row>
        <Col lg={3} md={2}></Col>
        <Col lg={6} md={8}>
          <p className='mt-3'>
            Don't have an account?{' '}
            <Link to='/register' className='text-info'>
              Register
            </Link>
          </p>
        </Col>
        <Col lg={3} md={2}></Col>
      </Row>
    </>
  );
};

export default LoginPage;
