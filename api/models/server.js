const express=require('express')   
const cors=require('cors')
   
   
   
   class Server{

    constructor(){
        this.app=express();
        
        this.userPath='/api/users'
        this.authPath='/api/auth'
    
        this.routes();
    }
    middlewares(){
        //
        this.app.use(express.json())

        this.app.use(cors())
    }
    routes(){
        this.app.use(this.userPath,require('../routes/user'))
        this.app.use(this.authPath,require('../routes/auth'))
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log('Listening at port:',process.env.PORT)
        })
    }

   }




   module.exports=Server;