import React, { useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import RecipeContext from '../context/recipes/recipeContext';

const RecipeDetailsPage = () => {
  const recipeContext = useContext(RecipeContext);
  const { recipe } = recipeContext;
  return (
    <>
      <h1></h1>
      <Row>
        <Col md={8}>{/* <h1>Ingredients</h1> */}</Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
};

export default RecipeDetailsPage;
