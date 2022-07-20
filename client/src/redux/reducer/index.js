


const initialState={
    operations:[],
    register:[]
}

const rootReducer=(state= initialState,{type,payload})=>{
    console.log('hola',payload, type)
    
    switch(type){
        case 'get_operations':{
            return{
                ...state,
                operations:payload
            }
        }
        default: return state;
    }
}



export default rootReducer