import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/esm/CardImg';

const RecipeCard = ({ recipe }) => {
  const { userName, recipeTitle, recipeDescription, recipeImage, _id } = recipe;
  return (
    <Card className='m-2 recipe-card'>
      <CardImg variant='top' src={recipeImage} />
      <Card.Body>
        <Card.Title>{recipeTitle}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>By {userName}</Card.Subtitle>
        <Card.Text className='two-lines-only'>{recipeDescription}</Card.Text>
        <Link
          to={`/recipes/${_id}/view`}
          className='link-underline recipe-card-link-position text-info'
        >
          View Recipe <i className='fas fa-arrow-circle-right'></i>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};
