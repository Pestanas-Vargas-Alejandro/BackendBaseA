const { Router } = require("express");
const {getUser, getUserByID, deleteUserByID,} = require ("../controllers/usuarios")
const router = Router()

router.get("/",getUser)
router.get("/id/:id/",getUserByID)
router.delete("/",deleteUserByID)

module.exports=router
