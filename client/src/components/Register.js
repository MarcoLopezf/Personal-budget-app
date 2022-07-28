import React, { useState } from 'react'
import { Button, Container, Form, Card } from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'
import authService from '../services/auth-services'
import Swal from 'sweetalert2'

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
    if(!email || !password || !name){
      return Swal.fire(
        'Incomplete Fields',
        'Please complete the required fields',
        'question'
      )}
    if(password.length<5){
      return  Swal.fire(
        'Password error ',
        'Password must have at least 6 characters',
        'error'
      )}
     
    
    try {
      await authService.register(name,email,password)
        .then(res=>{
          Swal.fire(
            'Account created succesfully!!',
            ' ',
            'success'
          )
          console.log(res.data)
        })
        navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnChange=(e)=>{
    e.preventDefault()
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
}



  return (
    <>
    <h3 className='text-center display-3 font-weight-bold'>Create a new account</h3>
    <Container className="mt-5 d-flex justify-content-md-center">
          <Container  className="mt-5 " style={{ width: '30rem' }}>
          <Card bg='dark'>
          <Card.Body>
    <Form onSubmit={handleRegister} >
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label className="text-white">Name</Form.Label>
      <Form.Control type="text" placeholder="Enter email" name='name' value={input.name} onChange={handleOnChange}/>
      
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label className="text-white">Email address</Form.Label>
      <Form.Control type="text" placeholder="Enter email" name='email' value={input.email} onChange={handleOnChange}/>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label className="text-white">Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name='password'value={input.password} onChange={handleOnChange}/>
    </Form.Group>
    
    <Button variant="primary" type="submit">
      Submit
    </Button>
    </Form>
    </Card.Body>  
        </Card>
    </Container></Container>

    </>
    
  )
}

export default Register