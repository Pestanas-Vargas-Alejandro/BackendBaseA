const rootMessages = (req,res)=> {
    res.send('Mensajes')
}

const hiMessages = (req,res)=> {
    res.send('Hola mundo')
}

const byeMessages = (req,res)=> {
    res.send('Adios mundo')
}

const postMessage = (req,res)=> {
    res.send('Mensaje post')
}

const putMessages = (req,res)=> {
    res.send('Mensaje put')
}

const deleteMessage = (req,res)=> {
    res.send('Mensaje delete')
}

module.exports ={rootMessages, hiMessages, byeMessages,postMessage,putMessages,deleteMessage}