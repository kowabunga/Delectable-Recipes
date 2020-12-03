import React from 'react';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-2'>
        <Container>
          <Route exact path='/' component={LandingPage} />
        </Container>
      </main>
    </Router>
  );
};

export default App;
