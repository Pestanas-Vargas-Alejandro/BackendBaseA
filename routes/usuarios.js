const { Router } = require("express");
const {getUser, getUserByID} = require ("../controllers/usuarios")
const router = Router()

router.get("/",getUser)
router.get("/id/:id/",getUserByID)

module.exports=router
