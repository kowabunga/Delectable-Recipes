import React, { useState, useContext, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import RecipeGroup from '../components/RecipeGroup';
import RecipeContext from '../context/recipes/recipeContext';
import UserContext from '../context/user/userContext';

const RecipesPage = ({ history }) => {
  const [recipeQuery, setRecipeQuery] = useState('');

  const recipeContext = useContext(RecipeContext);
  const { recipes, getAllRecipes, loading } = recipeContext;

  const userContext = useContext(UserContext);
  const { loggedIn } = userContext;

  useEffect(() => {
    getAllRecipes();
  }, []);

  const gotoAddRecipe = e => {
    e.preventDefault();
    history.push('/recipes/create');
  };

  const searchRecipes = () => {};

  return (
    <>
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
                  placeholder='Search for recipe...'
                  id='recipeSearchBox'
                  onChange={e => setRecipeQuery(e.target.value)}
                ></FormControl>
              </Col>
              <Col lg={3} sm={4} xs={3}>
                <Button variant='primary' type='submit' className='btn-block'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
          {loggedIn && (
            <Button
              onClick={e => gotoAddRecipe(e)}
              className='mt-2'
              variant='info'
            >
              Create Recipe
            </Button>
          )}
        </Col>
      </Row>

      <Row className='mt-4 align-items-center justify-content-center'>
        {loading ? (
          <Spinner animation='border'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        ) : (
          <RecipeGroup recipes={recipes}></RecipeGroup>
        )}
      </Row>
    </>
  );
};

export default RecipesPage;