import React, { useState } from 'react'
import { useEffect } from 'react'
import {  Button, Container, Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import { editOperation, getOperation } from '../redux/actions'
import Swal from 'sweetalert2'


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
  
  return error;
}


function Edit() {

  
    const navigate=useNavigate()
    const {id}=useParams()
    const dispatch=useDispatch()
    const operation= useSelector((state) => state.operation);
    const [input, setInput]=useState({
            Name:operation?.Name,
            Concept:operation?.Concept,
            Quantity:operation?.Quantity,
            Type:operation.Type==='SUM'? 'Deposit': 'Withdraw'
        })
    const [/*error*/,setError]=useState({
        Name:'',
        Concept:'',
        Quantity:'',
        Type:operation.Type==='SUM'? 'Deposit': 'Withdraw',
        })

    const handleOnSubmit=(e)=>{
      e.preventDefault()
      if(!input.Concept || !input.Name || !input.Quantity){
        return Swal.fire({
          icon:'error',
          title:'Incomplete fields.',
          text:'Please complete the missing fields'
        })
      }
      try {
        dispatch(editOperation(id,input))
        .then(()=>{
          Swal.fire(
            'Register updated succesfully!',
            '',
            'success'
          ).then(()=>{
            navigate('/home')
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      dispatch(getOperation(id))        
    },[dispatch])

    useEffect(()=>{
      setInput({
        Name:operation.Name,
        Concept:operation?.Concept,
        Quantity:operation?.Quantity,
        Type:operation.Type})
    },[operation])

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
    
  return (
    <div><Container style={{ height: 715 }}>
    <h1 className="mt-5 text-center h1">Edit Register </h1>
    <Container className='mt-3 d-flex justify-content-md-center'>
        <Container responsive className="mt-2 " style={{ width: '35rem' }}>
        <Card bg='dark'>
          <Card.Body> 
    <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="text-white">Name</Form.Label>
    <Form.Control
            type="text"
            placeholder={operation.Name}
            name="Name"
            value={input.Name}
            onChange={e=>handleOnChange(e)}
     />
    
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label className="text-white">Concept</Form.Label>  
    <Form.Control 
         as="textarea" rows={2}   
         value={input.Concept}
         name='Concept'
         placeholder='Description of the operation '
         onChange={e=>handleOnChange(e)}
    />
  </Form.Group>

  <Form.Group className="mb-" controlId="formBasicPassword">
    <Form.Label className="text-white">Quantity</Form.Label>
    <Form.Control 
        type="number"
        value={input.Quantity}
        name='Quantity'
        onChange={e=>handleOnChange(e)}
     />
  </Form.Group>
  <Form.Label className="text-white"> Type</Form.Label>
  <Form.Select 
    disabled 
    id="disabledSelect"
    aria-label="Default select example">

      <option hidden>{operation.Type==='SUM'? 'Deposit': 'Withdraw'}</option>
</Form.Select>
<Form.Text className="text-white">
          The type of operation can't be changed
</Form.Text>
 <br/> 
 <br/> 
  <Button variant="primary" type="submit" onClick={handleOnSubmit}>
    Edit
  </Button>
</Form>
</Card.Body></Card>
</Container></Container>

</Container></div>
  )
}

export default Edit