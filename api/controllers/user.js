const User = require("../models/user");


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

    const {body}=req;
    try {
        const user= new User(body);
        await user.save()
        res.json(user)

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