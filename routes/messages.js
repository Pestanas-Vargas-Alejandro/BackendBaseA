const {Router} = require ("express")
const router  = Router()

//router.get("",()=> {})
router.get("/",(req,res)=> {
    res.send('Hello world')
}) //END POINT

module.exports = router