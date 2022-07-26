const { response } = require("express");
const Operation = require("../models/operation");
const User = require("../models/user");

const getOperations=async(req,res)=>{

    const operation= await Operation.findAll()
    
    if(operation.length===0){
        res.send('no hay operaciones')
    }else{
        res.json(operation)
    }
}




const getRegister=async(req,res=response)=>{
    const {id}=req.params

    const operation= await Operation.findByPk(id)
    if(!operation){
        return res.json({
            msg:`Couldn't find the operation with the ID ${id} `
        })
    }
    res.json(operation)
}

const getOperationsById=async(req,res=response)=>{
    
    let total=0
    const {id}=req.params
    //TODO
    const operations= await Operation.findAll({
        order:[["createdAt","DESC"]],
        where:{
            operationId: id,
            state:true
        },
        include:{
            model:User
        }
    })  
    
        res.json(
            operations
            
        )
    }


const addOperation= async(req,res=response)=>{

    const {id, ...body}=req.body;
    try {
        const operation=await Operation.create(body)

        const user=await User.findByPk(id)
        console.log(body)
        
        await user.addOperation(operation)
        
        
        res.json(operation)
    } catch (error) {
        console.log(error)
        res.send(error)
    } 
}
const updateOperation= async(req,res=response)=>{
    const {id}=req.params
    const {body}=req
    const operation= await Operation.findByPk(id)

    if(operation){
        await operation.update(body)
        return res.json(operation)
    }else{
        res.send("couldn't find the operation with the id provided.");
    }
}
const deleteOperation= async(req,res=response)=>{
    const {id}=req.params
    console.log('este es el id', id)
    const operation= await Operation.findByPk(id)
    console.log(operation)
    if(operation){
        await operation.update({state:false})
        return res.json(operation)
    }else{
        res.send("couldn't find the operation with the id provided.");
    }
}

module.exports={
    addOperation,
    updateOperation,
    deleteOperation,
    getOperations,
    getOperationsById,
    getRegister}