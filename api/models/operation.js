const {DataTypes}= require('sequelize')
const db = require('../db/connection')

const Operation= db.define('Operation',{
    Name:{
        type:DataTypes.STRING,
        allowNull:false
    },    
    Concept:{
        type:DataTypes.STRING
    },
    Quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    Date:{
        type:DataTypes.STRING,
    },
    Type:{
        type:DataTypes.ENUM({
            values: ['SUM', 'REST']
          }),
        allowNull:false
    },
    state:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }


})

module.exports=Operation;