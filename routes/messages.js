const {Router} = require ("express")
const router  = Router()
const {rootMessages, hiMessages, byeMessages,postMessage,putMessages, deleteMessage} = require ('../controllers/messages.js')

//router.get("",()=> {})
router.get("/",rootMessages)  //END POINT

router.get("/hi",hiMessages) //END POINT

router.get("/bye",byeMessages) //END POINT

router.post('/',postMessage) //END POINT

router.put('/',putMessages) //END POINT

router.delete('/',deleteMessage) //END POINT

module.exports = router