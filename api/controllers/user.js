

const getUser=(req,res)=>{
    res.json('uuser baby')
}
const updateUser=(req,res)=>{
    res.json('update baby')
}
const deleteUser=(req,res)=>{
    res.json('delete  baby')
}




module.exports={
    getUser,
    deleteUser,
    updateUser
}