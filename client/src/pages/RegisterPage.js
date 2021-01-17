import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = e => {};

  return (
    <>
      <Row className='justify-content-center'>
        <Col lg={3} md={2}></Col>
        <Col lg={6} md={8}>
          <Form className='mt-3'>
            <FormGroup controlId='name'>
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
