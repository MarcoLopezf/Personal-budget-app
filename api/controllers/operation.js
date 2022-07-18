const { response } = require("express");
const Operation = require("../models/operation");
const User = require("../models/user");


const getOperations=async(req,res=response)=>{
    
    //TODO
    const operations= await Operation.findAll()
    console.log(typeof operations)
    if(operations.length===0){
        res.send('no hay operaciones')
    }else{
        res.json(operations)
    }
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
    const operation= await Operation.findByPk(id)

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
    getOperations}