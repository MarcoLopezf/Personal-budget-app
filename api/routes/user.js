const { Router } = require("express");
const { getUser, updateUser, deleteUser } = require("../controllers/user");


const router=Router();

router.get('/:id',getUser)

router.put('/:id',updateUser)

router.delete('/:id',deleteUser)



module.exports=router;