import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeGroup = ({ recipes }) => {
  return (
    <>
      {recipes.map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </>
  );
};

RecipeGroup.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeGroup;
