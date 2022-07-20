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