import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserContext from './context/user/userContext';
import PrivateRoute from './components/PrivateRoute';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import RecipesPage from './pages/RecipesPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import MyAccount from './pages/MyAccountPage';
import RecipeCreatePage from './pages/RecipeCreatePage';
import MyAccountEditPage from './pages/MyAccountEditPage';
import MyRecipesPage from './pages/MyRecipesPage';
import PageNotFound from './pages/PageNotFound';

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
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route exact path='/recipes' component={RecipesPage} />
            <PrivateRoute path='/recipes/create' component={RecipeCreatePage} />
            <Route path='/recipes/:id' component={RecipeDetailsPage} />
            <PrivateRoute exact path='/account' component={MyAccount} />
            <PrivateRoute path='/account/edit' component={MyAccountEditPage} />
            <PrivateRoute path='/account/recipes' component={MyRecipesPage} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
      </Container>
      <footer className='text-center lead pt-5 pb-2'>
        Copyright &copy; {new Date().getFullYear()} Delectable Recipes
      </footer>
    </Router>
  );
};

export default MainApp;
