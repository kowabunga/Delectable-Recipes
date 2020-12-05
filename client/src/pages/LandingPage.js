import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';

const LandingPage = () => {
  const searchRecipes = () => {};
  return (
    <>
      <Card className='landing-card text-white text-center p-5' fluid>
        <Container>
          <h1 className='display-2'>Wholesum Recipes For All</h1>
          <p className='lead pt-4'>
            Home is where the heart is, but the center of that heart is the
            kitchen and the wonderful food that is prepared and served to
            families of all shapes and sizes.
          </p>
        </Container>
      </Card>
      <Form onSubmit={searchRecipes}>
        <FormGroup id='searchRecipes'>
          <FormLabel></FormLabel>
          <FormControl>

          </FormControl>
        </FormGroup>
      </Form>
    </>
  );
};

export default LandingPage;
