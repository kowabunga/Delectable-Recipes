import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import UserContext from '../context/user/userContext';

const Header = ({ history }) => {
  const userContext = useContext(UserContext);
  const { loggedIn, logoutUser } = userContext;

  const logout = e => {
    e.preventDefault();
    console.log('Logout');
    logoutUser();
  };

  return (
    // Add 'exact' to each link container otherwise styling gets confused as all links have a '/' in them and thus are the home link and current link are active
    <header>
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
            {!loggedIn ? (
              <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <NavDropdown title='Your Account' id='account-nav-dropdown'>
                  <LinkContainer to='/account'>
                    <NavDropdown.Item>Account Details</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/account/recipes'>
                    <NavDropdown.Item>Your Recipes</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <Button type='button' onClick={e => logout(e)}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
