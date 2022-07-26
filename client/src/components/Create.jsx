import React from 'react'
import { useState } from 'react'
import { Badge, Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createOperation } from '../redux/actions'



function validate(state){
    const error={}

    if(!state.Name){
        error.Name='The name of the operation is required.'
    }
    if(!state.Concept){
        error.Concept='The name of the operation is required.'
    }
    if(!state.Quantity){
      error.Quantity='The Quantity is required.'
    }
    if(!state.Type){
      error.Type='Please, choose a type of operation.'
    }
    return error;
}

function Create() {

    const user= JSON.parse(localStorage.getItem('user'))
    const dispatch=useDispatch()
    const [input, setInput]=useState({
        Name:'',
        Concept:'',
        Quantity:'',
        Type:'',
        id:user.user.id
    })
    const [error,setError]=useState({
        Name:'',
        Concept:'',
        Quantity:'',
        Type:'',
      })

    const handleOnChange=(e)=>{
        e.preventDefault()
        setInput((state) => {
          const newState = {
            ...state,
            [e.target.name]: e.target.value,
          };
          setError(validate(newState));
          return newState;
        });

    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      if(!input.Concept || !input.Name || !input.Quantity){
        return alert('Incomplete Fields.')
      }
      input.Quantity= +input.Quantity
      try {
        dispatch(createOperation(input))
      } catch (error) {
        console.log(error)
      }
    }


  return (
  <>
    <Container style={{ height: 715 }}>
        <h2>
            <Badge bg="secondary">Create a new register!</Badge>
        </h2>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          name='Name'
          type="text" 
          value={input?.Name}
          placeholder="Name of the operation"
          onChange={handleOnChange}/>
         {error.Name && (
                      <Badge bg="danger" t className="text-white ">
                        {error.Name}
                      </Badge>
                    )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Concept</Form.Label>
        <Form.Control 
        as="textarea" 
        name='Concept'
        rows={2}  
        value={input?.Concept} 
        placeholder='Description of the operation ' 
        onChange={handleOnChange}/>
        {error.Concept && (
                      <Badge bg="danger" t className="text-white ">
                        {error.Concept}
                      </Badge>
                    )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Quantity" 
        value={input?.Quantity} 
        onChange={handleOnChange}
        name='Quantity'
        />
         {error.Quantity && (
                      <Badge bg="danger" t className="text-white ">
                        {error.Quantity}
                      </Badge>
                    )}
        </Form.Group>
      <Form.Group>

        <Form.Label> Type</Form.Label>
        <Form.Select 
        value={input?.Type} 
        name='Type'
        aria-label="Default select example"
        onChange={e=>handleOnChange(e)}>
        <option hidden>Choose the type of the operation</option>
        <option value="SUM">Deposit</option>
        <option value="REST">Withdraw</option>
        </Form.Select>
        {error.Type && (
                  <Badge bg="danger" t className="text-white ">
                    {error.Type}
                  </Badge>
                )}
      </Form.Group>
      <br/>
      <br/>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
    </Container>
  </>
  )
}

export default Create