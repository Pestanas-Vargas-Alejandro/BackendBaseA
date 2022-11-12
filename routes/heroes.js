const { Router } = require("express");
const {getHeroe,getHeroeByID,deleteHeroeByID, addHeroe,updateHeroeByNombre,signIn,newPassword} = require ("../controllers/heroes")
const router = Router()

///GET///
router.get("/",getHeroe)
router.get("/id/:id/",getHeroeByID)//http://localhost:4000/api/v1/usuarios/id/11

///DELETE//
router.delete("/",deleteHeroeByID)// http://localhost:4000/api/v1/usuarios/?id=1

///POST//
router.post("/",addHeroe)
router.post("/signin",signIn)
router.post("/newPassword",newPassword)

///PUT//
router.put("/",updateHeroeByNombre)


module.exports=router