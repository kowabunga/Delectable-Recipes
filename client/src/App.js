import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RecipeState from './context/recipes/RecipeState';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <RecipeState>
      <Router>
        <Header />
        <Container>
          <main className='py-2'>
            <Route exact path='/' component={LandingPage} />
          </main>
        </Container>
        <footer className='text-center lead pt-5 pb-2'>
          Copyright &copy;{new Date().getFullYear()} Delectable Recipes
        </footer>
      </Router>
    </RecipeState>
  );
};

export default App;
