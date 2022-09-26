const { request, response } = require("express")

const rootMessages = (req=request,res=response)=> {
    res.json({msg:'Mensajes'})
}

const hiMessages = (req=request,res=response)=> {
    res.json({hi:'Hola mundo'})
}

const byeMessages = (req=request,res=response)=> {
    res.json({bye:'Adios mundo'})
}

const postMessage = (req=request,res=response)=> {
    res.json({pst:'Mensaje post'})
}

const putMessages = (req=request,res=response)=> {
    res.json({pt:'Mensaje put'})
}

const deleteMessage = (req=request,res=response)=> {
    res.json({del:'Mensaje delete'})
}

module.exports ={rootMessages, hiMessages, byeMessages,postMessage,putMessages,deleteMessage}