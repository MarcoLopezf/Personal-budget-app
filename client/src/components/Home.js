import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getOperations } from '../redux/actions';


function Home() {
  
    const dispatch=useDispatch()
    const operations= useSelector((state) => state.operations);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.user.id)
  
    useEffect(()=>{
        dispatch(getOperations(user.user.id))
    },[dispatch])
    return (
        <>
        <Container>

        <table className="table-dark table-bordered">
        <thead>
                        <tr className="text-dark">
                        <th>#</th>
                        <th>Register</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>  </th>
                        <th>  </th>
                        </tr>
                    </thead>
        <tbody className="text-dark">
            
        </tbody>
        </table>
        </Container>
        </>
  )
}

export default Home;