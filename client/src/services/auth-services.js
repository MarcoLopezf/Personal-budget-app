import axios from 'axios'


const singUp= async(email,password)=>{
    return axios.post('http://localhost:7000/api/auth/login',{email,password})
        .then(res=>{

            if(res.data.token){
                localStorage.setItem('user',JSON.stringify(res.data))
            }
            return res.data
        })
} 
const register=async(name,email,password)=>{
    return await axios.post('http://localhost:7000/api/users',{name,email,password})
        .then(res=>{
            console.log(res.data)
            if(res.data.token){
                localStorage.setItem('user',JSON.stringify(res.data))
            }
            return res.data
        })
}

const logOut=()=>{
    localStorage.removeItem('user');
}


const authService={
    singUp,
    register,
    logOut
}
export default authService;