const { response } = require('express')
const jwt=require('jsonwebtoken');
const User = require('../models/user');



    const validatejwt=async(req,res=response,next)=>{
        const token=req.header('token');
        if(!token){
            return res.status(401).json({msg:'no hay token en la peticion'})
        }
        try {
            console.log(token)
            const {id}=  jwt.verify(token,process.env.SECRETORPRIVATEKEY)
            console.log(id)
            


           const user= await User.findByPk(id)
            console.log(user)
            if(!user){
                return res.status(401).json({msg:'usuario no valido- usuario false'})
            }

           if(!user.state){
               return res.status(401).json({msg:'token no valido- usuario false'})
           }

            req.user=user;
            next();
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg:'Invalid Token'
            })
        }
        
        
    }


    module.exports={
        validatejwt
    }