import React from 'react';
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/esm/CardImg';

const RecipeCard = ({ recipe }) => {
  const { user, recipeTitle, recipeDescription, recipeImage } = recipe;
  return (
    <Card style={{ width: '18rem', height: '25rem' }} className='m-2'>
      <CardImg variant='top' src={recipeImage} />
      <Card.Body>
        <Card.Title>{recipeTitle}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>By {user}</Card.Subtitle>
        <Card.Text>{recipeDescription}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
