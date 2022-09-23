const rootMessages = (req,res)=> {
    res.send('Mensajes')
}

const hiMessages = (req,res)=> {
    res.send('Hola mundo')
}

const byeMessages = (req,res)=> {
    res.send('Adios mundo')
}

module.exports ={rootMessages, hiMessages, byeMessages}