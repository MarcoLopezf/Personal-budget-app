import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'
import authService from '../services/auth-services'

function Register() {


  const navigate=useNavigate();
  const [input,setInput]=useState({
    name:'',
    password:'',
    email:''
  })

  const {name,email,password}=input;

  const handleRegister=async(e)=>{
    e.preventDefault()
    
    
    try {
      await authService.register(name,email,password)
        .then(res=>{
          alert('Register ok.')
          console.log(res.data)
        })
        navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnChange=(e)=>{
    e.preventDefault()
    console.log('hola')
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
}



  return (
    <>
    <h3 className='text-center display-3 font-weight-bold'>Create a new account</h3>
    <Container className="mt-5 d-flex justify-content-md-center">
          <Container  className="mt-5 " style={{ width: '25rem' }}>
    
    <Form onSubmit={handleRegister} >
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter email" name='name' value={input.name} onChange={handleOnChange}/>
      
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="text" placeholder="Enter email" name='email' value={input.email} onChange={handleOnChange}/>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name='password'value={input.password} onChange={handleOnChange}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    </Form>
    </Container></Container>

    </>
    
  )
}

export default Register