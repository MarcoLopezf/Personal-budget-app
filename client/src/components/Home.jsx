import React, { useEffect } from 'react'
import { Alert, Badge, Button,  Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { deleteOperation, getOperations } from '../redux/actions';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2'

function Home() {
    
    const dispatch=useDispatch()
    const operations= useSelector((state) => state.operations);
    const user = JSON.parse(localStorage.getItem("user"));
    
    
    const getTotal=()=>{
        let total=0
        operations.map(e=>{
            if(e.Type==='SUM'){
                total+=e.Quantity
            }else{
                total-=e.Quantity
            }
            return total
        })
        return total
    }
    useEffect(()=>{
        dispatch(getOperations(user.user.id))
    },[dispatch])

    const handleDelete=(id)=>{
      
    Swal.fire({
        title: 'Do you want to save the changes?',
        showCancelButton: true,
        confirmButtonText: 'Save',
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteOperation(id));
            Swal.fire('Saved!', '', 'success')
                .then(()=>{
                    window.location.reload();
                })
    }
    })
        
}
console.log(user.user)


    return (
        <div className='text-center'>

            <h1 className="mt-3 h1 display-4">{user.user.name}'s balance  💰</h1>
        {!operations?.length? (
            <Container style={{ height: 715 }}>
            <Alert className="mt-5" variant="warning">
              Welcome! <b>{user.user.name}</b> you don't have any register yet, press the button below to get started!💸
            </Alert>
            <div className="mt-5">
            <Button as={Link} to={'/create'} variant="secondary" size="lg">
                Create new register.
            </Button>

            </div>
          </Container>
            ):(<>
                <div className="mt-4">
            <Button as={Link} to={'/create'} variant="success" size="lg">
                Create new register.
            </Button>

            </div>
            <Container responsive className="mt-5 " > 
        
        <Table className="mt-4"
            responsive
            striped
            bordered
            hover
            size="sm"
            variant="table table-dark table-striped">
            <thead>
                <tr className="text-white">
                <th>## </th>
                <th>Register</th>
                <th>Concept</th>
                <th>Date</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>  </th>
                <th>  </th>
                </tr>
            </thead>
        {operations && operations?.slice(0,10).map((e,index)=>(
            <tbody key={index+1} className="text-light">
            <tr>
                <th scope='row'>{index+1}</th>
                <td >{e.Name}</td>
                <td >{e.Concept}</td>
                <td >{e.Date}</td>
                <td>
                    {e.Type==='REST'?(
                        <h5>
                        <Badge bg='danger' text="dark">
                          {" "}
                          Withdraw{" "}
                        </Badge>
                        </h5>
                      
                    ):( <h5>
                        <Badge bg="success" text="dark">
                          {" "}
                          Deposit{" "}
                        </Badge>
                      </h5>)}
                </td>
                <td>${e.Quantity}</td>
                <td>
                    <Button as={Link} to={`/edit/${e.id}`}>
                        Edit
                    </Button>
                </td>
                <td>
                    <Button variant='danger' onClick={()=>handleDelete(e.id)}>
                        X
                    </Button>
                </td>
            </tr>
            </tbody>

        ))}
            
        </Table>
       
        </Container>
        <div className="d-grid gap-2">
        <h2>Total account balance: 
            {getTotal()>0?
            <Badge bg="success" text="dark">
            {" "}
            ${getTotal()}{" "}
          </Badge>:<Badge bg="danger" text="dark">
                          {" "}
                          ${getTotal()}{" "}
                        </Badge>
        }
            </h2>
        </div>
        </>
        )}
        
        </div>
  )
}

export default Home;