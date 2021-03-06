import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import RecipeForm from '../components/RecipeForm';

const RecipeCreatePage = ({ history }) => {
  const [hasAlert, setHasAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  return (
    <Row className='justify-content-center'>
      <Col lg={8} md={10}>
        <h1 className='text-center'>Create Your Recipe</h1>
        {hasAlert && <Alert variant='danger'>{alertMsg}</Alert>}
        <RecipeForm setHasAlert={setHasAlert} setAlertMsg={setAlertMsg} history={history}/>
      </Col>
    </Row>
  );
};

export default RecipeCreatePage;
