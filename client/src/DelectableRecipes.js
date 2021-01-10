import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserContext from './context/user/userContext';
import PrivateRoute from './components/PrivateRoute';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import RecipesPage from './pages/RecipesPage';
import Login from './pages/LoginPage';
import MyAccount from './pages/MyAccountPage';
import RecipeCreatePage from './pages/RecipeCreatePage';

const MainApp = () => {
  const userContext = useContext(UserContext);
  const { setUserLoggedIn } = userContext;

  useEffect(() => {
    // Check if user previously logged in has jwt in local storage on page load
    setUserLoggedIn();
  }, []);

  return (
    <Router>
      <Header />
      <Container>
        <main className='py-2'>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/recipes' component={RecipesPage} />
          <Route path='/recipes/:id/view' component={RecipeDetailsPage} />
          <PrivateRoute path='/recipes/create' component={RecipeCreatePage} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/account' component={MyAccount} />
        </main>
      </Container>
      <footer className='text-center lead pt-5 pb-2'>
        Copyright &copy; {new Date().getFullYear()} Delectable Recipes
      </footer>
    </Router>
  );
};

export default MainApp;
