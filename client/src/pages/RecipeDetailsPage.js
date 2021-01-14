import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import RecipeContext from '../context/recipes/recipeContext';

const RecipeDetailsPage = ({ match }) => {
  const recipeContext = useContext(RecipeContext);
  const {
    recipe,
    recipe: { userName, recipeTitle, recipeImage, ingredients, recipeSteps },
    getSingleRecipe,
  } = recipeContext;

  const editMediaLink = link => {
    if (link) {
      link = link.replace('watch?v=', 'embed/');
    }
    return link;
  };

  useEffect(() => {
    getSingleRecipe(match.params.id);
  }, [match]);
  return (
    <>
      <Link to='/recipes' className='text-info'>
        <i className='fas fa-arrow-circle-left'></i> Back to Recipes
      </Link>
      <br />
      <br />
      {Object.keys(recipe).length > 0 && (
        <>
          <h1>{recipeTitle}</h1>
          <p className='h5 mt-3 text-muted'>By {userName}</p>
          <Row className='align-items-center  pt-3 pb-4 mt-4'>
            <Col lg={6} md={5}>
              <Image src={recipeImage} fluid className='sm-bot' />
            </Col>

            <Col lg={4} md={7} className='mb-4'>
              <h2>Ingredients</h2>
              <ListGroup>
                {ingredients &&
                  ingredients.map(ingredient => (
                    <ListGroupItem key={ingredient._id}>
                      {ingredient.amount} {ingredient.ingredient}
                    </ListGroupItem>
                  ))}
              </ListGroup>
            </Col>

            <Row className='justify-content-center'>
              <Col>
                <ListGroup variant='flush'>
                  {recipeSteps &&
                    recipeSteps.map((step, idx) => (
                      <ListGroupItem
                        key={step._id}
                        className='mx-2 light-shadow'
                      >
                        <p className='lead text-primary'>
                          {idx + 1}. {step.title}
                        </p>
                        <p>{step.directions}</p>
                        {/* Media type can be one of two things: Image or Video. Only show if present */}
                        {step.media !== '' && step.mediaType === 'image' && (
                          <Image src={step.media} fluid />
                        )}

                        <Col lg={10}>
                          {step.media !== '' && step.mediaType === 'video' && (
                            <div className='iframe-wrapper'>
                              <iframe
                                src={editMediaLink(step.media)}
                                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen={true}
                                width='100%'
                                height='100%'
                                title={`Video for recipe step entitled ${step.title}`}
                              ></iframe>
                            </div>
                          )}
                        </Col>
                        {step.optional !== '' && <p>{step.optional}</p>}
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </Col>
            </Row>
          </Row>
        </>
      )}
    </>
  );
};

export default RecipeDetailsPage;
