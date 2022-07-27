import axios from 'axios'
import authHeader from '../../services/auth-header'


export  function getOperations(id){
    return async function(dispatch){
        console.log(authHeader())
        return axios.get(`http://localhost:7000/api/operations/${id}`,{ headers: authHeader()})
                .then(resp=>{
                    console.log(resp.data)

                    dispatch({
                    type:'get_operations',
                    payload:resp.data})
            })
    }
}

export function deleteOperation(id){
    return async function(dispatch){
        return axios.delete(`http://localhost:7000/api/operations/${id}`, {headers: authHeader()})
            .then(resp=>{
                console.log(resp.data)
                dispatch({
                    type:'delete_operation',
                    payload:resp.data
                })
            })
    }
}

export function getOperation(id){
    return async function (dispatch){
        return axios.get(`http://localhost:7000/api/operations/edit/${id}`, {headers: authHeader()})
            .then(res=>{
                dispatch({
                    type:'get_operation',
                    payload: res.data
                })
            })
    }
}

export function createOperation(body){
    return async function(dispatch){
        return axios.post(`http://localhost:7000/api/operations`, body, {headers: authHeader()})
            .then(res=>{
                dispatch({
                    type:'create_operation',
                    payload:res.data
                })
            })
    }
}

export function editOperation(id,body){
    return async function(dispatch){
        return axios.put(`http://localhost:7000/api/operations/${id}`,body, {headers: authHeader()})
            .then(res=>{
                dispatch({
                    type:'edit_operation',
                    payload:res.data
                })
            })
    }
}