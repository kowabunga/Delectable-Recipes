import React, { useState, useContext, useEffect } from 'react';
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

const RegisterPage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userContext = useContext(UserContext);
  const { registerUser, loggedIn, registerError } = userContext;

  const register = e => {
    e.preventDefault();
    registerUser(name, email, password);
  };

  useEffect(() => {
    loggedIn && history.push('/account');
  });

  return (
    <>
      {registerError && <Alert variant='danger'>{registerError}</Alert>}
      <Row className='justify-content-center'>
        <Col lg={3} md={2}></Col>
        <Col lg={6} md={8}>
          <Form className='mt-3'>
            <FormGroup controlId='name' autoComplete='off'>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter name...'
                variant={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>

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

            <FormGroup controlId='confirmpassword'>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type='password'
                placeholder='Enter password...'
                variant={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <Button
              variant='outline-primary'
              type='button'
              onClick={e => register(e)}
            >
              Register
            </Button>
          </Form>
        </Col>
        <Col lg={3} md={2}></Col>
      </Row>
      <Row>
        <Col lg={3} md={2}></Col>
        <Col lg={6} md={8}>
          <p className='mt-3'>
            Already have an account?{' '}
            <Link to='/login' className='text-info'>
              Login
            </Link>
          </p>
        </Col>
        <Col lg={3} md={2}></Col>
      </Row>
    </>
  );
};

export default RegisterPage;
