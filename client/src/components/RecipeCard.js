import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardImg from 'react-bootstrap/esm/CardImg';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import RecipeContext from '../context/recipes/recipeContext';
import UserContext from '../context/user/userContext';

const RecipeCard = ({ recipe, isEditOrDelete, history }) => {
  const recipeContext = useContext(RecipeContext);
  const { deleteRecipe } = recipeContext;

  const userContext = useContext(UserContext);
  const { jwt } = userContext;

  const { userName, recipeTitle, recipeDescription, recipeImage, _id } = recipe;

  const editRecipe = () => {};

  const deleteR = e => {
    e.preventDefault();
    deleteRecipe(_id, jwt);
  };

  return (
    <Card className='m-2 recipe-card position-relative'>
      {isEditOrDelete && (
        <ButtonGroup className='edit-delete position-absolute'>
          <OverlayTrigger
            placement={'top'}
            overlay={<Tooltip>Edit Recipe</Tooltip>}
          >
            <Button variant='warning' size='sm'>
              <i class='far fa-edit bigger'></i>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement={'top'}
            overlay={<Tooltip>Delete Recipe</Tooltip>}
          >
            <Button variant='danger' size='sm' onClick={deleteR}>
              <i class='far fa-trash-alt bigger'></i>
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      )}
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
