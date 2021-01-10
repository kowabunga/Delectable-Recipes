import React from 'react';
import DelectableRecipes from './DelectableRecipes';
import RecipeState from './context/recipes/RecipeState';
import UserState from './context/user/UserState';

const App = () => {
  return (
    <UserState>
      <RecipeState>
        <DelectableRecipes />
      </RecipeState>
    </UserState>
  );
};

export default App;
