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

  const [validated, setValidated] = useState(false);

  const userContext = useContext(UserContext);
  const { registerUser, loggedIn, registerError } = userContext;

  const register = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (
      name !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      registerUser(name, email, password, confirmPassword);
    }
  };

  useEffect(() => {
    loggedIn && registerError.length <= 0 && history.push('/account');
  }, [loggedIn, registerError]);

  return (
    <>
      {registerError.length > 0 &&
        registerError.map((error, idx) => (
          <Alert key={idx} variant='danger'>
            {error}
          </Alert>
        ))}
      <Row className='justify-content-center'>
        <Col lg={3} md={2}></Col>
        <Col lg={6} md={8}>
          <Form
            className='mt-3'
            noValidate
            validated={validated}
            onSubmit={register}
          >
            <FormGroup controlId='name' autoComplete='off'>
              <FormLabel>Name</FormLabel>
              <FormControl
                required
                type='text'
                placeholder='Enter name...'
                variant={name}
                onChange={e => setName(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter your name.
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup controlId='email'>
              <FormLabel>Email</FormLabel>
              <FormControl
                required
                type='email'
                placeholder='Enter email...'
                variant={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a valid email.
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup controlId='password'>
              <FormLabel>Password</FormLabel>
              <FormControl
                required
                type='password'
                placeholder='Enter password...'
                variant={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Enter your password.
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup controlId='confirmpassword'>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                required
                type='password'
                placeholder='Enter password...'
                variant={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Enter your password again.
              </Form.Control.Feedback>
            </FormGroup>

            <Button variant='outline-primary' type='submit'>
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
