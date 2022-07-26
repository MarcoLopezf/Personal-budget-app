const bcryptjs=require('bcryptjs')
const User = require("../models/user");
const generateJWT=require('../helpers/generate-jwt')


const getUser=async(req,res)=>{
    
    const {id}=req.params

    const user= await User.findByPk(id)

    if(user){
        res.json(user)
    }else{
        res.json({msg:`Couldn't find the user with the id ${id} `})
    }
}


const postUser=async(req,res)=>{

    const { email , name , password}=req.body;
    try {
        
        const invalidEmail= await User.findOne({
            where:{
                email:email
            }
        })
        console.log(invalidEmail)
        if(invalidEmail){
            return res.json({
                msg:`The user with the email ${email} already exist`
            })
        }
        
        
        const user= new User({name, email, password, state:true});

        const salt=bcryptjs.genSaltSync(10);
        user.password=bcryptjs.hashSync(password,salt)

        await user.save()
        console.log(user)
        const token=await generateJWT(user.id)

        res.json({user,token})

    } catch (error) {
        console.log(error)
    }



    
}
const updateUser=async(req,res)=>{

    const {id}=req.params
    const {body}=req
    const user= await User.findByPk(id)

    if(user){
        await user.update(body)
        return res.json(user)
    }else{
        res.send("couldn't find the user with the id provided.");
    }
}



const deleteUser=async(req,res)=>{
    
    const {id}=req.params;
    const user= await User.findByPk(id)

    if(user){
        await user.update({state:false})
        return res.json(user)
    }else{
        res.send("couldn't find the game with the id provided.");
    }
}





module.exports={
    getUser,
    deleteUser,
    updateUser,
    postUser
}