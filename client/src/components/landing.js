import React from 'react'

import {Button,Alert, Container} from 'react-bootstrap';

import { Link } from 'react-router-dom';
function Landing() {

  return (
  <>
    <h1 className='text-center display-3 font-weight-bold'>Welcome to your Personal Budget App</h1>
    <Container className='mt-5'>
      <Alert className="mt-5" variant="info">
          Welcome! This app was built for <a  href='https://www.alkemy.org/'  rel="noreferrer" target="_blank">Alkemy.org</a>  fullstack project.<br/>
          Here, you can management your finances and bring the control of your deposits and withdraws, please login or create an account for start!
      </Alert>
      
      <Button as={Link} to={'/login'}>login</Button>
      {'        '}
      <Button as={Link} to={'/register'}>Create an account</Button>
      
    </Container>
    
  </>
  )
}

export default Landing