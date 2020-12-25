import React, { useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Image from 'react-bootstrap/Image';
import RecipeContext from '../context/recipes/recipeContext';

const RecipeDetailsPage = ({ match }) => {
  const recipeContext = useContext(RecipeContext);
  const {
    recipe,
    recipe: {
      userName,
      recipeTitle,
      recipeDescription,
      recipeImage,
      ingredients,
      recipeSteps,
    },
    getSingleRecipe,
  } = recipeContext;
  console.log(recipe);
  useEffect(() => {
    getSingleRecipe(match.params.id);
  }, [match]);
  return (
    <>
      {Object.keys(recipe).length > 0 && (
        <>
          <h1>{recipeTitle}</h1>
          <p className='h5 mt-3'>By {userName}</p>
          <Row className='align-items-center recipebg pt-3 pb-4 mt-4'>
            <Col lg={6} md={5}>
              <Image src={recipeImage} fluid />
            </Col>

            <Col lg={4} md={7}>
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
            <Col lg={2}></Col>
                {/* @TODO WORK HERE */}
            <Row>
              <Col lg={6} md={8} sm={10}>
                <ListGroup>
                  {recipeSteps &&
                    recipeSteps.map((step, idx) => (
                      <ListGroupItem key={step._id}>
                        {idx}. {step}
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
