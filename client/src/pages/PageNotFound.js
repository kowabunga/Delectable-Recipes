import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import OhNo404Image from '../images/undraw_page_not_found_su7k.svg';

const PageNotFound = () => {
  return (
    <Row>
      <h1>
        Oh no! The page you're looking for simply cannot be found. Here's a way
        to go{' '}
        <Link to='/'>
          home <i class='fas fa-home'></i>
        </Link>
      </h1>
      <Image src={OhNo404Image} fluid />
    </Row>
  );
};

export default PageNotFound;
