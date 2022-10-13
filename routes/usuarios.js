const { Router } = require("express");
const {getUser} = require ("../controllers/usuarios")
const router = Router()

router.get("/",getUser)

module.exports=router
