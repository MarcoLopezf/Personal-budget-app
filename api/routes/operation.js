const { Router } = require("express");
const { check } = require("express-validator");
const { addOperation, updateOperation, deleteOperation, getOperations, getOperationsById, getRegister } = require("../controllers/operation");
const { validateFields } = require("../middlewares/validate");
const { validatejwt } = require("../middlewares/validate-jwt");



const router=Router();

router.get('/',getOperations)

router.get('/edit/:id',[validatejwt,validateFields],getRegister)
router.get('/:id',[validatejwt,validateFields],getOperationsById)

router.post('/',[
    validatejwt,
    check('name').not().isEmpty(),
    check('type').not().isEmpty(),
    check('quantity').not().isEmpty(),
    validateFields
],addOperation)


router.put('/:id',[validatejwt,validateFields],updateOperation)

router.delete('/:id',[validatejwt,validateFields],deleteOperation)




module.exports=router;