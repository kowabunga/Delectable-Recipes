import React, { useState, useEffect, useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import RecipeGroup from '../components/RecipeGroup';
import RecipeContext from '../context/recipes/recipeContext';
import UserContext from '../context/user/userContext';

const LandingPage = () => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getAllRecipes, loading, recipeError } = recipeContext;

  const userContext = useContext(UserContext);
  const { setUserLoggedIn, loggedIn } = userContext;

  // eslint-disable-next-line
  const [recipeQuery, setRecipeQuery] = useState('');

  useEffect(() => {
    getAllRecipes();
    setUserLoggedIn();
    // eslint-disable-next-line
  }, []);

  const searchRecipes = e => {
    e.preventDefault();
  };

  return (
    <div className='justify-content-center align-items-center'>
      <Row>
        <Col>
          {loggedIn && (
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
          )}
          <div className='landing-card text-white text-center p-5'>
            <h1 className='display-4 text-light'>Wholesum Recipes For All</h1>
            <p className='lead pt-4'>
              Home is where the heart is, but the center of that heart is the
              kitchen and the wonderful food that is prepared and served to
              families of all shapes and sizes.
            </p>
          </div>
        </Col>
      </Row>

      <Row className='pt-4 text-center justify-content-center align-items-center'>
        <p className='px-2'>
          Looking for recipes? Search to see if we have your favorite recipes or
          scroll down to see some of our favorites!
        </p>
      </Row>

      <Row className='justify-content-center'>
        <Col lg={10} md={8} sm={12}>
          <Form onSubmit={searchRecipes}>
            <Form.Row className='align-items-center'>
              <Col lg={9} sm={8} xs={9}>
                <FormLabel htmlFor='recipeSearchBox' srOnly>
                  Search For Recipes
                </FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter recipe...'
                  id='recipeSearchBox'
                  onChange={e => setRecipeQuery(e.target.value)}
                ></FormControl>
              </Col>
              <Col lg={3} sm={4} xs={3}>
                <Button
                  variant='outline-info'
                  type='submit'
                  className='btn-block'
                >
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>

      <Row className='mt-4 align-items-center justify-content-center'>
        {recipeError.length > 0 ? (
          recipeError.map(error => <Alert variant='danger'>{error}</Alert>)
        ) : loading ? (
          <Spinner animation='border'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        ) : (
          <RecipeGroup recipes={recipes}></RecipeGroup>
        )}
      </Row>
    </div>
  );
};

export default LandingPage;
