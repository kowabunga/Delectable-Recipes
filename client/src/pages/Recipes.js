import React, { useState, useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import RecipeGroup from '../components/RecipeGroup';
import RecipeContext from '../context/recipes/recipeContext';

const Recipes = () => {
  const [recipeQuery, setRecipeQuery] = useState('');

  const recipeContext = useContext(RecipeContext);
  const { recipes, getAllRecipes, loading } = recipeContext;

  useEffect(() => {
    getAllRecipes();
  }, []);

  const searchRecipes = () => {};

  return (
    <>
      <Row className='pt-4 text-center justify-content-center align-items-center'>
        <p className='display-4'></p>
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
                <Button variant='primary' type='submit' className='btn-block'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>

      <Row className='mt-4 align-items-center justify-content-center'>
        <RecipeGroup recipes={recipes}></RecipeGroup>
      </Row>
    </>
  );
};

export default Recipes;