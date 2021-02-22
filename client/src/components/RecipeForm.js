import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FormControl from 'react-bootstrap/FormControl';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Alert from 'react-bootstrap/Alert';
import UserContext from '../context/user/userContext';
import RecipeContext from '../context/recipes/recipeContext';

//@TODO Make this form work for edit and create submits
const RecipeForm = ({ setAlertMsg, setHasAlert, history, match }) => {
  const recipeContext = useContext(RecipeContext);
  const { getSingleRecipe, editRecipe, createRecipe, recipe } = recipeContext;

  const userContext = useContext(UserContext);
  const { user, jwt } = userContext;

  const [ingAdd, setIngAdd] = useState(false);

  const [formPageNum, setFormPageNum] = useState(0);
  const [recipeStepNum, setRecipeStepNum] = useState(0);
  const [validated, setValidated] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [stepTitle, setStepTitle] = useState('');
  const [stepDirection, setstepDirection] = useState('');
  const [stepMedia, setStepMedia] = useState('');
  const [stepMediaType, setStepMediaType] = useState('media');
  const [imageType, setImageType] = useState(false);
  const [videoType, setVideoType] = useState(false);
  const [recipeSteps, setRecipeSteps] = useState([]);

  useEffect(() => {
    // If loading recipe edit page first time, get recipe to edit from recipe id in url params
    if (history.location.pathname !== '/recipes/create') {
      getSingleRecipe(match.params.id);
    }

    // If edit page but not loading (the recipe has been loaded), set all required input field values in state
    if (
      history.location.pathname !== '/recipes/create' &&
      Object.keys(recipe).length > 0
    ) {
      setRecipeTitle(recipe.recipeTitle);
      setRecipeDescription(recipe.recipeDescription);
      setRecipeImage(recipe.recipeImage);
      setIngredients(recipe.ingredients.join(', '));
      setRecipeSteps(recipe.recipeSteps);
    }
  }, [recipe]);

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
      if (history.location.pathname === '/recipes/create') {
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
      } else {
        if (recipeStepNum < recipeSteps.length - 1)
          setRecipeStepNum(recipeStepNum + 1);
      }
    }
  };

  const RecipeFormSubmit = e => {
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
      ingredients: [...ingredients.split(',')],
      recipeSteps,
    };

    // Either create recipe OR edit recipe based on path
    if (history.location.pathname === '/recipes/create') {
      // Create recipe from context && redirect to recipes
      createRecipe(recipe, user.name, jwt) && history.push('/account/recipes');
    } else {
      console.log('Edit Form Submission');
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={RecipeFormSubmit}>
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
            Add your ingredients one at a time with the measurement first, such
            as <em>1/4 cup Flour</em>. Separate ingredients by a comma such as
            this: <em> 1/4 cup Flour, 1/2 cup Butter</em>
          </p>
          <FormGroup controlId='recipeIngredient' autoComplete='off'>
            <FormLabel>Ingredient</FormLabel>
            <FormControl
              required
              type='text'
              placeholder='Enter ingredient and measurement...'
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
            />
          </FormGroup>
        </>
      ) : (
        // Recipe Steps has two components. The Create and the Edit. The edit must loop through the preexisting steps one at a time.
        <>
          {history.location.pathname === '/recipes/create' ? (
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
          ) : (
            //@TODO make edit put individual recipeSteps in state for input binding
            <>
              <FormGroup>
                <FormLabel>Step Title</FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter step title'
                  value={recipeSteps[recipeStepNum].title}
                  onChange={e => setStepTitle(e.target.value)}
                ></FormControl>
              </FormGroup>

              <FormGroup>
                <FormLabel>Step Directions</FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter step directions...'
                  value={recipeSteps[recipeStepNum].directions}
                  onChange={e => setstepDirection(e.target.value)}
                ></FormControl>
              </FormGroup>

              <FormGroup>
                <FormLabel>Step Media (optional)</FormLabel>
                <FormControl
                  type='text'
                  placeholder='Enter optional step media...'
                  value={recipeSteps[recipeStepNum].media}
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
          ? history.location.pathname === '/recipes/create'
            ? 'Start Recipe'
            : 'Begin Edit'
          : formPageNum === 1
          ? 'Continue'
          : history.location.pathname === '/recipes/create'
          ? 'Add Step'
          : 'Edit Step'}
      </Button>
      <Button type='submit' block disabled={recipeSteps.length < 1}>
        {history.location.pathname === '/recipes/create'
          ? 'Create Recipe'
          : 'Edit Recipe'}
      </Button>
    </Form>
  );
};

export default RecipeForm;
