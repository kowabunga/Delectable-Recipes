import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeGroup = ({ recipes, isEditOrDelete }) => {
  return (
    <>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          isEditOrDelete={isEditOrDelete}
        />
      ))}
    </>
  );
};

RecipeGroup.defaultProps = {
  isEditOrDelete: false,
};

RecipeGroup.propTypes = {
  recipes: PropTypes.array.isRequired,
  isEditOrDelete: PropTypes.bool.isRequired,
};

export default RecipeGroup;
