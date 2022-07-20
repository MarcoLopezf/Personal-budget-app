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



const authService={
    singUp
}
export default authService;