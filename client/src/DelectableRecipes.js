import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserContext from './context/user/userContext';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';

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
          <Route exact path='/recipes' component={Recipes} />
          <Route path='/recipes/:id' component={RecipeDetailsPage} />
          <Route path='/login' component={Login} />
          <Route path='/account' component={MyAccount} />
        </main>
      </Container>
      <footer className='text-center lead pt-5 pb-2'>
        Copyright &copy; {new Date().getFullYear()} Delectable Recipes
      </footer>
    </Router>
  );
};

export default MainApp;