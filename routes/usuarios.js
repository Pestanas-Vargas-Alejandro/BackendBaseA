const { Router } = require("express");
const {getUser, getUserByID, deleteUserByID, addUser, updateUserByUsuario,} = require ("../controllers/usuarios")
const router = Router()

///GET///
router.get("/",getUser)
router.get("/id/:id/",getUserByID)

///DELETE//
router.delete("/",deleteUserByID)

///POST//
router.post("/",addUser)

///PUT//
router.put("/",updateUserByUsuario)

module.exports=router
