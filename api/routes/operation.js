const { Router } = require("express");
const { addOperation, updateOperation, deleteOperation, getOperations } = require("../controllers/operation");



const router=Router();

router.get('/',getOperations)

router.post('/',addOperation)

router.put('/:id',updateOperation)

router.delete('/:id',deleteOperation)




module.exports=router;