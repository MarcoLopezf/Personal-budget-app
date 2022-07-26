import React, { useEffect } from 'react'
import { Alert, Badge, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { deleteOperation, getOperations } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';


function Home() {
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const operations= useSelector((state) => state.operations);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.user.id)
    
    
    const getTotal=()=>{
        let total=0
        operations.map(e=>{
            if(e.Type==='SUM'){
                total+=e.Quantity
            }else{
                total-=e.Quantity
            }
        })
        return total
    }
    useEffect(()=>{
        dispatch(getOperations(user.user.id))
    },[dispatch])

    const handleDelete=(id)=>{
        dispatch(deleteOperation(id));
        window.location.reload();

    }


    return (
        <div className='text-center'>

        {!operations?.length? (
            <Container style={{ height: 715 }}>
            <Alert className="mt-5" variant="info">
              Hi! <b>{user.user.name}</b> please add some register 💸
            </Alert>
            <div className="d-grid gap-2">
            <Button as={Link} to={'/create'} variant="secondary" size="lg">
                Create new register.
            </Button>

            </div>
          </Container>
            ):(<>
                <div className="d-grid gap-2">
            <Button as={Link} to={'/create'} variant="secondary" size="lg">
                Create new register.
            </Button>

            </div>
        <table className="table-dark table-bordered">
            <thead>
                <tr className="text-dark">
                <th>#</th>
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
            <tbody key={index+1} className="text-dark">
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
                <td>{e.Quantity}</td>
                <td>
                    <Button as={Link} to={`/edit/${e.id}`}>
                        Edit
                    </Button>
                </td>
                <td>
                    <Button onClick={()=>handleDelete(e.id)}>
                        X
                    </Button>
                </td>
            </tr>
            </tbody>

        ))}
            
        </table>
        <h2>Account balance<span className="badge bg-secondary">{getTotal()}</span></h2>
        </>
        )}
        
        </div>
  )
}

export default Home;