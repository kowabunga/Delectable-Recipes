import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import UserContext from '../context/user/userContext';

const RecipeCreatePage = () => {
  const [recipe, setRecipe] = useState({});
  const [formPageNum, setFormPageNum] = useState(0);
  const [validated, setValidated] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([]);

  const createRecipe = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
  };

  const addIngredient = ingredient => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <Row>
      <Col lg={8} md={10}>
        <h1 className='text-center'>Create Your Recipe</h1>
        <Form noValidate validated={validated} onSubmit={createRecipe}>
          {formPageNum === 0 ? (
            <>
              <FormGroup controlId='recipeTitle' autoComplete='off'>
                <FormLabel>Title</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter recipe title...'
                  variant={recipeTitle}
                  onChange={e => setRecipeTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId='recipeDescription' autoComplete='off'>
                <FormLabel>Description</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter recipe title...'
                  variant={recipeDescription}
                  onChange={e => setRecipeDescription(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId='recipeImage' autoComplete='off'>
                <FormLabel>Image</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter an image for your finished recipe...'
                  variant={recipeImage}
                  onChange={e => setRecipeImage(e.target.value)}
                />
              </FormGroup>
            </>
          ) : formPageNum === 1 ? (
            <>
              <p className='lead'>
                Add your ingredients one at a time. Click 'Add Ingredient' to
                add it to the list. Click 'Continue' when you are done.
              </p>
              <FormGroup controlId='recipeTitle' autoComplete='off'>
                <FormLabel>Ingredient</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter recipe title...'
                  variant={recipeTitle}
                  onChange={e => setRecipeTitle(e.target.value)}
                />
              </FormGroup>
              <Button
                type='button'
                variant='outline-primary'
                className='mb-2'
                onClick={addIngredient}
              >
                Add Ingredient
              </Button>
            </>
          ) : (
            <></>
          )}

          <Button
            type='button'
            variant='info'
            className='mb-1'
            block
            onClick={() => setFormPageNum(formPageNum + 1)}
          >
            {formPageNum === 0
              ? 'Start Recipe'
              : formPageNum === 1
              ? 'Continue'
              : 'Add Step'}
          </Button>
          <Button type='submit' block disabled={recipeSteps.length < 1}>
            Create Recipe
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default RecipeCreatePage;
