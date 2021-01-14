import React, { useContext, useState, useEffect } from 'react';
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
  const { logInUser, loggedIn, loginError } = userContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = e => {
    e.preventDefault();

    logInUser(email, password);
  };

  useEffect(() => {
    loggedIn && history.push('/account');
  }, [loggedIn]);

  return (
    <>
      {loginError.error !== undefined && (
        // <></>
        <Alert variant='danger'>{loginError.error}. Please try again.</Alert>
      )}
      <Row className='justify-content-center'>
        <Col lg={3} md={2}></Col>
        <Col lg={6} md={8}>
          <Form className='mt-3'>
            <FormGroup controlId='email'>
              <FormLabel>Email</FormLabel>
              <FormControl
                type='email'
                placeholder='Enter email...'
                variant={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='password'>
              <FormLabel>Password</FormLabel>
              <FormControl
                type='password'
                placeholder='Enter password...'
                variant={password}
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
    </>
  );
};

export default LoginPage;
