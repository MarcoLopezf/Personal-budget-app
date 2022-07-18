const express=require('express')   
const cors=require('cors');
const db = require('../db/connection');
require('./connection')
   
   
   class Server{

    constructor(){
        this.app=express();
        
        this.userPath='/api/users'
        this.authPath='/api/auth'
        this.operationsPath='/api/operations'
    
        this.middlewares();
        this.dbConnection()
        this.routes();
    }

    async dbConnection(){
        try{
            await db.sync({force:false});
            console.log('database online')
        }catch(err){
            throw new Error(err)
        }
    }

    middlewares(){
        //
        this.app.use(express.json())

        this.app.use(cors())
    }
    routes(){
        this.app.use(this.userPath,require('../routes/user'))
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.operationsPath,require('../routes/operation'))
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log('Listening at port:',process.env.PORT)
        })
    }

   }




   module.exports=Server;