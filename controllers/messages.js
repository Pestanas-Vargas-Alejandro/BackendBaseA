const { request, response } = require("express")

const rootMessages = (req=request,res=response)=> {
    res.status (404).json({msg:'Mensajes'})
}

const hiMessages = (req=request,res=response)=> {
    res.json({msg:'Hola mundo'})
}

const byeMessages = (req=request,res=response)=> {
    res.json({msg:'Adios mundo'})
}

const postMessage = (req=request,res=response)=> {
    res.json({msg:'Mensaje post'})
}

const putMessages = (req=request,res=response)=> {
    res.json({msg:'Mensaje put'})
}

const deleteMessage = (req=request,res=response)=> {
    res.json({msg:'Mensaje delete'})
}

module.exports ={rootMessages, hiMessages, byeMessages,postMessage,putMessages,deleteMessage}