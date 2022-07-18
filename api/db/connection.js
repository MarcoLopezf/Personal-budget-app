const {Sequelize}= require('sequelize')


const db= new Sequelize('Alkemy-challenge','postgres','mdq2022',{
    host:'localhost',
    dialect:'postgres',
    
})




module.exports=db;