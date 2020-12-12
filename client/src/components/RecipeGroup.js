import React from 'react';
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

export default RecipeGroup;
