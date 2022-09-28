const { request, response } = require("express")

const rootMessages = (req=request,res=response)=> {
    const {texto1, texto2} = req.query
    if (!texto1 || !texto2){
        res.status (400).json({
            msg: "No se han pasado los parametros necesarios, este EndPoint ocupa los parametros 'texto1' y 'texto2'"
        })
    }
    res.status (404).json({msg: texto1 + '' +texto2})
}

const hiMessages = (req=request,res=response)=> {
    res.status(402).json({msg:'Hola mundo'})
}

const byeMessages = (req=request,res=response)=> {
    res.status(408).json({msg:'Adios mundo'})
}

const postMessage = (req=request,res=response)=> {
    res.status (426).json({msg:'Mensaje post'})
}

const putMessages = (req=request,res=response)=> {
    res.status (423).json({msg:'Mensaje put'})
}

const deleteMessage = (req=request,res=response)=> {
    res.status (500).json({msg:'Mensaje delete'})
}

module.exports ={rootMessages, hiMessages, byeMessages,postMessage,putMessages,deleteMessage}