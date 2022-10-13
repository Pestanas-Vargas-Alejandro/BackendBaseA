const { request, response } = require("express");

const getUser = (req=request, res=response) =>{
    console.log("Funcion getUser")
    res.json({msg: "Funcion getUser"})
}

module.exports= {getUser}