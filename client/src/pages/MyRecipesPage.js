import React, { useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import RecipeGroup from '../components/RecipeGroup';
import RecipeContext from '../context/recipes/recipeContext';
import UserContext from '../context/user/userContext';
import { Link } from 'react-router-dom';

const MyRecipesPage = () => {
  const recipeContext = useContext(RecipeContext);
  const { userRecipes, getUserRecipes, loading } = recipeContext;

  const userContext = useContext(UserContext);
  const { jwt } = userContext;

  useEffect(() => {
    getUserRecipes(jwt);
    // eslint-disable-next-line
  }, []);

  return (
    <Row className='align-items-center justify-content-center flex-column'>
      <h1>My Recipes</h1>
      {userRecipes.length === 0 && (
        <p className='lead'>
          You haven't created any recipes yet. Why not{' '}
          <Link to='/recipes/create' className='text-info'>
            create some?
          </Link>
        </p>
      )}
      {loading ? (
        <Spinner animation='border'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      ) : (
        <RecipeGroup recipes={userRecipes} isEditOrDelete={true} />
      )}
    </Row>
  );
};

export default MyRecipesPage;
