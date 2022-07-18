const { response } = require("express")
const User = require("../models/user")
const bcryptjs=require('bcryptjs')
const generateJWT=require('../helpers/generate-jwt')


const login= async(req,res=response)=>{
    
    const {email,password}=req.body

    try {
        //verify email
        console.log(email)
        const user= await User.findOne({where:{email}})
        if(!user){
            return res.json({
                msg:`The user with the email ${email} doesn't exist.`
            })
        }
        if(!user.state){
            return res.status(400).json({
                msg:"Unsubscribed user, talk to the administrator"
            }) 
        }

        const validPassword=bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg:"Invalid password"
            })
        }

        //generate JWT
         const token=await generateJWT(user.id)
        res.json({user,token})

    } catch (error) {
        console.log(error)
        res.send (error)
    }
}


module.exports={login}