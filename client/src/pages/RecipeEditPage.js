import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import RecipeForm from '../components/RecipeForm';

const RecipeEditPage = ({ history, match }) => {
  const [hasAlert, setHasAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  return (
    <Row className='justify-content-center'>
      <Col lg={8} md={10}>
        <Link to='/account/recipes' className='text-info'>
          <i className='fas fa-arrow-circle-left'></i> Back to My Recipes
        </Link>
        <h1 className='text-center'>Edit Recipe</h1>
        {hasAlert && <Alert variant='danger'>{alertMsg}</Alert>}
        <RecipeForm
          setHasAlert={setHasAlert}
          setAlertMsg={setAlertMsg}
          history={history}
          match={match}
        />
      </Col>
    </Row>
  );
};

export default RecipeEditPage;
