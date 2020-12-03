import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  //@todo User Link below
  return (
    <Navbar bg='light' expand='md'>
      <LinkContainer to='/'>
        <Navbar.Brand>BRAND</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='main-navbar' />
      <Navbar.Collapse id='main-navbar'>
        <Nav className=''>
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/recipes'>
            <Nav.Link>Recipes</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
