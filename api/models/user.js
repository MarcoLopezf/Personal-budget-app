const {DataTypes}= require('sequelize');
const db = require('../db/connection');
// const db = require('../db/connection')

const User= db.define('User',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    state:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }


})

module.exports=User;