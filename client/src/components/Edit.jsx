import React, { useState } from 'react'
import { useEffect } from 'react'
import { Badge, Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOperation } from '../redux/actions'

function Edit() {

    const {id}=useParams()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getOperation(id))
    },[dispatch])
    const operation= useSelector((state) => state.operation);

    const [input, setInput]=useState({
        Name:operation.Name,
        Concept:operation.Concept,
        Quantity:operation.Quantity,
        Type:''
    })
    const [error,setError]=useState({
        Name:'',
        Concept:'',
        Quantity:'',
        Type:operation.Type==='SUM'? 'Deposit': 'Withdraw',
      })

    const handleOnChange=(e)=>{
        e.preventDefault()
        setInput(()=>{
            const newState={
                ...input,
                [e.target.name]:e.target.value}
                
            }
        )

    }
    
  return (
    <div><Container style={{ height: 715 }}>
    <h2>
        <Badge bg="secondary">Edit !</Badge>
    </h2>
    <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="email"  placeholder="Name of the operation"  onChange={handleOnChange}/>
    
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Concept</Form.Label>
    <Form.Control as="textarea" rows={2}  placeholder='Description of the operation ' onChange={handleOnChange}/>
  </Form.Group>
  <Form.Group className="mb-" controlId="formBasicPassword">
    <Form.Label>Quantity</Form.Label>
    <Form.Control type="number" placeholder={operation.Quantity}  onChange={handleOnChange}    />
  </Form.Group>
  <Form.Label> Type</Form.Label>
  <Form.Select disabled id="disabledSelect" aria-label="Default select example">
    <option hidden>{operation.Type==='SUM'? 'Deposit': 'Withdraw'}</option>
</Form.Select>
<Form.Text className="text-muted">
          The type of operation can't be changed
</Form.Text>
 <br/> 
 <br/> 
  <Button variant="primary" type="submit">
    Create
  </Button>
</Form>
</Container></div>
  )
}

export default Edit