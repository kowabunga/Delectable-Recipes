import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import RecipeContext from '../context/recipes/recipeContext';
import UserContext from '../context/user/userContext';

const RecipeCreatePage = ({ history }) => {
  const recipeContext = useContext(RecipeContext);
  const { createRecipe } = recipeContext;

  const userContext = useContext(UserContext);
  const { user, jwt } = userContext;

  const [hasAlert, setHasAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const [ingAdd, setIngAdd] = useState(false);

  const [formPageNum, setFormPageNum] = useState(0);
  const [validated, setValidated] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [stepTitle, setStepTitle] = useState('');
  const [stepDirection, setstepDirection] = useState('');
  const [stepMedia, setStepMedia] = useState('');
  const [stepMediaType, setStepMediaType] = useState('media');
  const [imageType, setImageType] = useState(false);
  const [videoType, setVideoType] = useState(false);
  const [recipeSteps, setRecipeSteps] = useState([]);

  const nextPage = () => {
    if (formPageNum === 0) {
      if (
        recipeTitle.length > 0 &&
        recipeDescription.length > 0 &&
        recipeImage.length > 0
      ) {
        setFormPageNum(formPageNum + 1);
        setHasAlert(false);
        setAlertMsg('');
      } else {
        setHasAlert(true);
        setAlertMsg('You must enter all fields to continue');
      }
    } else if (formPageNum === 1) {
      if (ingredients.length > 0) {
        setFormPageNum(formPageNum + 1);
        setHasAlert(false);
        setAlertMsg('');
      } else {
        setHasAlert(true);
        setAlertMsg('Every recipe needs ingredients. Please enter some!');
      }
    } else {
      const step = {
        title: stepTitle,
        directions: stepDirection,
        media: stepMedia,
        mediaType: stepMediaType,
      };
      setStepTitle('');
      setstepDirection('');
      setStepMedia('');
      setRecipeSteps([...recipeSteps, step]);
      setImageType(false);
      setVideoType(false);
    }
  };

  const createRecipeSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    const recipe = {
      recipeTitle,
      recipeDescription,
      recipeImage,
      ingredients,
      recipeSteps,
    };

    // Create recipe from context && redirect to recipes
    createRecipe(recipe, user.name, jwt) && history.push('/account/recipes');
  };

  // Add ingredient to ingredient arr & clear current ingredient
  const addIngredient = () => {
    setIngAdd(true);
    setIngredients([...ingredients, ingredient]);
    setIngredient('');
    console.log(ingredients);
    setTimeout(() => {
      setIngAdd(false);
    }, 2500);
  };

  return (
    <Row className='justify-content-center'>
      <Col lg={8} md={10}>
        <h1 className='text-center'>Create Your Recipe</h1>
        {hasAlert && <Alert variant='danger'>{alertMsg}</Alert>}
        <Form noValidate validated={validated} onSubmit={createRecipeSubmit}>
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

              <FormGroup controlId='recipeImage' autoComplete='off'>
                <FormLabel>Image</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter an image for your finished recipe...'
                  value={recipeImage}
                  onChange={e => setRecipeImage(e.target.value)}
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

              {ingAdd && <Alert variant='success'>Ingredient Added</Alert>}
              <FormGroup controlId='recipeIngredient' autoComplete='off'>
                <FormLabel>Ingredient</FormLabel>
                <FormControl
                  required
                  type='text'
                  placeholder='Enter ingredient and measurement...'
                  value={ingredient}
                  onChange={e => setIngredient(e.target.value)}
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
                  type='text'
                  placeholder='Enter step title'
                  value={stepTitle}
                  onChange={e => setStepTitle(e.target.value)}
                ></FormControl>
              </FormGroup>

              <FormGroup>
                <FormLabel>Step Directions</FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter step directions...'
                  value={stepDirection}
                  onChange={e => setstepDirection(e.target.value)}
                ></FormControl>
              </FormGroup>

              <FormGroup>
                <FormLabel>Step Media (optional)</FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter optional step media...'
                  value={stepMedia}
                  onChange={e => setStepMedia(e.target.value)}
                ></FormControl>
              </FormGroup>
              <p className='pt-3'>Select media type: Image or Video</p>
              <FormGroup>
                <ButtonGroup>
                  <ToggleButton
                    type='radio'
                    variant='secondary'
                    checked={imageType}
                    value='1'
                    onChange={e => {
                      setImageType(true);
                      videoType && setVideoType(false);
                      setStepMediaType('image');
                    }}
                    name=''
                  >
                    {' '}
                    Image
                  </ToggleButton>
                  <ToggleButton
                    type='radio'
                    variant='secondary'
                    checked={videoType}
                    value='1'
                    onChange={e => {
                      setVideoType(true);
                      imageType && setImageType(false);
                      setStepMediaType('video');
                    }}
                    name=''
                  >
                    {' '}
                    Video
                  </ToggleButton>
                </ButtonGroup>
              </FormGroup>
            </>
          )}

          <Button
            type='button'
            variant='info'
            className='mb-1'
            block
            onClick={() => nextPage()}
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
