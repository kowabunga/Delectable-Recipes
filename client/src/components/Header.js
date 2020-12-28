import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  //@todo User Link below
  return (
    // Add 'exact' to each link container otherwise styling gets confused as all links have a '/' in them and thus are the home link and current link are active
    <Navbar bg='primary' variant='dark' expand='md'>
      <LinkContainer exact to='/'>
        <Navbar.Brand>Delectable Recipes Brand</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='main-navbar' />
      <Navbar.Collapse id='main-navbar'>
        <Nav className='ml-auto'>
          <LinkContainer exact to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer exact to='/recipes'>
            <Nav.Link>Recipes</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
