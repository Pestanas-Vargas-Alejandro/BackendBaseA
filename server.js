const express = require ('express')

class Server{
    constructor(){
        this.app = express()
        this.routes()
    }

    routes(){
        this.app.get('/',(req,res)=>{
        res.send('Hello world')
        })
    }

    listen() {
        this.app.listen(process.env.PORT,()=>{
        console.log("Backend en ejecución en el puerto", process.env.PORT)
        })
    }

}

module.exports = Server