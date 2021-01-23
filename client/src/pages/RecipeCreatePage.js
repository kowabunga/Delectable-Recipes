import React, { useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import UserContext from '../context/user/userContext';

//@todo Recipe Step Stuff
const RecipeCreatePage = () => {
  // Use a reference to the input to clear on value on ingredient add
  const ingredientRef = useRef(null);
  const stepTitleRef = useRef(null);
  const stepDescriptionRef = useRef(null);
  const stepMediaRef = useRef(null);

  const [recipe, setRecipe] = useState({});
  const [formPageNum, setFormPageNum] = useState(0);
  const [validated, setValidated] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeMedia, setRecipeMedia] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [stepTitle, setStepTitle] = useState('');
  const [stepDescription, setStepDescription] = useState('');
  const [stepMedia, setStepMedia] = useState('');
  const [recipeSteps, setRecipeSteps] = useState([]);

  const createRecipe = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
  };

  // Add ingredient to ingredient arr & clear current ingredient
  const addIngredient = () => {
    setIngredients([...ingredients, ingredient]);
    setIngredient('');
    ingredientRef.current.value = '';
    console.log(recipeTitle);
    console.log(recipeDescription);
    console.table(ingredients);
    console.table(recipeSteps);
  };

  return (
    <Row className='justify-content-center'>
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
                  value={recipeTitle}
                  onChange={e => setRecipeTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId='recipeDescription' autoComplete='off'>
                <FormLabel>Description</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter recipe description...'
                  value={recipeDescription}
                  onChange={e => setRecipeDescription(e.target.value)}
                />
              </FormGroup>

              <FormGroup controlId='recipeMedia' autoComplete='off'>
                <FormLabel>Image</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter an image for your finished recipe...'
                  value={recipeMedia}
                  onChange={e => setRecipeMedia(e.target.value)}
                />
              </FormGroup>
            </>
          ) : formPageNum === 1 ? (
            <>
              <p className='lead'>
                Add your ingredients one at a time with the measurement first,
                such as <em>1/4 cup Flour</em>. Click <em>Add Ingredient</em> to
                add it to the list. Click <em>Continue</em> when you are done.
              </p>
              <FormGroup controlId='recipeIngredient' autoComplete='off'>
                <FormLabel>Ingredient</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter ingredient and measurement...'
                  value={ingredient}
                  onChange={e => setIngredient(e.target.value)}
                  ref={ingredientRef}
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
            <>
              <FormGroup>
                <FormLabel>Step Title</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter step title'
                  value={stepTitle}
                  onChange={e => setStepTitle(e.target.value)}
                ></FormControl>
              </FormGroup>
            </>
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
