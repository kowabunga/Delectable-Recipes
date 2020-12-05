import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-2'>
        <Route exact path='/' component={LandingPage} />
      </main>
      <footer className='text-center lead'>
        Copyright &copy;{new Date().getFullYear()} Delectable Recipes
      </footer>
    </Router>
  );
};

export default App;
