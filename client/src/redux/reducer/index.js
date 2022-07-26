

const GET_OPERATIONS='get_operations'
const GET_OPERATION='get_operation'
const DELETE_OPERATION='delete_operation'
const  CREATE_OPERATION= 'create_operation'

const initialState={
    operations:[],
    operation:[]
}

const rootReducer=(state= initialState,{type,payload})=>{
    
    switch(type){
        case GET_OPERATIONS:{
            return{
                ...state,
                operations:payload
            }
        }
        case DELETE_OPERATION:{
            return{
                ...state
            }
        }
        case GET_OPERATION:{
            return{
                ...state,
                operation:payload
            }
        }
        case CREATE_OPERATION:{
            return{
                ...state
            }
        }
        default: return state;
    }
}



export default rootReducer