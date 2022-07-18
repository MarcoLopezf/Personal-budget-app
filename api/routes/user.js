const { Router } = require("express");
const { getUser, updateUser, deleteUser, postUser } = require("../controllers/user");


const router=Router();

router.post('/',postUser)

router.get('/:id',getUser)

router.put('/:id',updateUser)

router.delete('/:id',deleteUser)




module.exports=router;