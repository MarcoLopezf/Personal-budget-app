const { Router } = require("express");
const { check } = require('express-validator');
const { getUser, updateUser, deleteUser, postUser } = require("../controllers/user");
const { emailExist } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate");
const { validatejwt } = require("../middlewares/validate-jwt");


const router=Router();

router.post('/',[
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min:6}),
    check('email').custom((email)=>emailExist(email)),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields    
],postUser)

router.get('/:id',[validatejwt,validateFields],getUser)

router.put('/:id',[validatejwt,validateFields],updateUser)

router.delete('/:id',[validatejwt,validateFields],deleteUser)




module.exports=router;