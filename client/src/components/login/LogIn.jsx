import React, { useState } from 'react'
import {Badge, Button,Card,Container,Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth-services';
import Swal from 'sweetalert2'
function LogIn() {
    
    const navigate=useNavigate()
    
    const[input,setInput]=useState({
        email:'',
        password:''
    })
    
    const { email , password } = input;
    
    const handleOnChange=(e)=>{
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleLogin=async(e)=>{
        e.preventDefault();
        if(!email || !password){
          return Swal.fire(
            'Incomplete Fields',
            'Please complete the required fields',
            'question'
          )
        }
        try {
            await authService.singUp(email,password)
                .then((res)=>{
                    console.log(res.user)
                    if(res.user){
                      Swal.fire(
                        'Succesfully logged in!',
                        ' ',
                        'success'
                      )
                    navigate('/home')}
                    else{
                      alert(res.msg)
                    }
                })
        } catch (error) {
            
        }
    }


  return (
    <>
    <h1 className="mt-5 text-center h1"><Badge bg="success" className="text-dark">Login</Badge></h1>
    <Container className="mt-5 d-flex justify-content-md-center">
      <Container  className="mt-5 " style={{ width: '30rem' }}>
        <Card bg='dark'>
          <Card.Body>

            <Form onSubmit={handleLogin} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label  className="text-white">Email address</Form.Label>
              <Form.Control type="text" placeholder="Enter email" name='email' value={input.email} onChange={handleOnChange}/>
              <Form.Text className="text-muted text-white">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password'value={input.password} onChange={handleOnChange}/>
            </Form.Group>
            
            <Button className="float-right" variant="primary" type="submit">
              Submit
            </Button>
            </Form>
          </Card.Body>  
        </Card>
      </Container>
    </Container>
    </>
  )
}

export default LogIn;