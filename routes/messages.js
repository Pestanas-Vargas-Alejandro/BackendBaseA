const {Router} = require ("express")
const router  = Router()
const {rootMessages, hiMessages, byeMessages} = require ('../controllers/messages.js')

//router.get("",()=> {})
router.get("/",rootMessages)  //END POINT

router.get("/hi",hiMessages) //END POINT

router.get("/bye",byeMessages) //END POINT

module.exports = router