const { Router } = require("express");
const {getUser, getUserByID, deleteUserByID, addUser, updateUserByUsuario, signIn, newPassword,} = require ("../controllers/usuarios")
const router = Router()

///GET///
router.get("/",getUser)
router.get("/id/:id/",getUserByID)

///DELETE//
router.delete("/",deleteUserByID)

///POST//
router.post("/",addUser)
router.post("/signin",signIn)

///PUT//
router.put("/",updateUserByUsuario)
router.post("/newPassword",newPassword)

module.exports=router
