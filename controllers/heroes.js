const { request, response, json } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require ("../db/connection")
const modeloUsuarios = require("../models/heroes");

const getHeroe = async (req=request, res=response) =>{
    let conn;

    try {
        conn = await pool.getConnection()
        const users = await conn.query(modeloUsuarios.queryGetUsers, (error)=>{throw new error})
        if (!users){
            res.status(404).json ({msg: "No se encontraron Heroes"})
            return
        } 

        res.json({users})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const getHeroeByID = async (req=request, res=response) =>{
    const {id}= req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [user] = await conn.query(modeloUsuarios.queryGetUserByID, [id], (error)=>{throw new error})

        if (!user){
            res.status(404).json ({msg: `No se encontraron heroes con el ID ${id}`})
            return
        } 

        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const deleteHeroeByID = async (req=request, res=response) =>{
    const {id}= req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloUsuarios.queryDeleteUserByID, [id], (error)=>{throw new error})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo eliminar el heroe con el ID ${id}`})
            return
        } 

        res.json({msg:`El heroe con el ID ${id} se elimno satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const addHeroe = async (req=request, res=response) =>{
    const {
        Status,
        Nombre,
        Contrasena,
        Rol,
        H_Max,
        Nacionalidad
    }= req.body

    if(
        !Status|| 
        !Nombre|| 
        !Contrasena|| 
        !Rol|| 
        !H_Max|| 
        !Nacionalidad 
     ) {
        res.status(400).json({msg:"Falta informacion del heroe"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.queryUserExists, [Nombre])
        if (user){
            res.status(403).json({msg:`El heroe ${Nombre} ya se encuentra registrado`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena,salt)

        const {affectedRows} = await conn.query(modeloUsuarios.queryAddUser, [
            Status,
            Nombre,
            contrasenaCifrada,
            Rol,
            H_Max,
            Nacionalidad
        ], (error)=>{throw new error})

        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo agregar el heroe ${Nombre}`})
            return
        } 
        res.json({msg:`El heroe ${Nombre} se agrego satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const updateHeroeByNombre = async (req=request, res=response) =>{
    const {
        Nombre,
        Rol,
        H_Max,
        Nacionalidad
    }= req.body

    if(
        !Nombre|| 
        !Rol|| 
        !H_Max||
        !Nacionalidad
     ) {
        res.status(400).json({msg:"Falta informacion del heroe"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.queryGetUserInfo, [Nombre])

        if (!user){
            res.status(403).json({msg:`El heroe ${Nombre} no se encuentra registrado`})
            return
        }

        const {affectedRows} = await conn.query(modeloUsuarios.queryUpdateByNombre, [
            Rol || user.Rol,
            H_Max || user.H_Max,
            Nacionalidad || user.Nacionalidad,
            Nombre
        ], (error)=>{throw new error})
        
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo actualizar el registro del heroe ${Nombre}`})
            return
        } 
        res.json({msg:`El heroe ${Nombre} se actualizo satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const signIn = async (req=request, res=response) =>{
    const {
        Nombre,
        Contrasena
    }= req.body

    if(
        !Nombre|| 
        !Contrasena
     ) {
        res.status(400).json({msg:"Falta informacion del heroe"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.querySignIn, [Nombre])
        if (!user || user.Activo === 'N' ){
            let code = !user ? 1 :2;
            res.status(403).json({msg:`El heroe o la Contraseña son incorrectos`,errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, user.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El heroe o la Contraseña son incorrectos`, errorCode:3})
            return
        }

        res.json({msg:`El heroe ${Nombre} ha iniciado sesión satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const newPassword = async (req=request, res=response) =>{
    const {
        Nombre,
        AContrasena,
        NContrasena
    }= req.body

    if(
        !Nombre|| 
        !AContrasena||
        !NContrasena
     ) {
        res.status(400).json({msg:"Faltan datos"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.querySignIn, [Nombre])
        if (!user || user.Activo === 'N' ){
            let code = !user ? 1 :2;
            res.status(403).json({msg:`El heroe o la Contraseña son incorrectos`,errorCode:code})
            return
        }

        const datosValidos = bcryptjs.compareSync(AContrasena, user.Contrasena)

        if(!datosValidos){
            res.status(403).json({msg:`El heroe o la Contraseña son incorrectos`, errorCode:3})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(NContrasena,salt)

        const {affectedRows} = await conn.query(modeloUsuarios.queryUpdatePassword, [
            contrasenaCifrada,
            Nombre
        ], (error)=>{throw new error})

        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo actualizar la contraseña de ${Nombre}`})
            return
        } 

        res.json({msg:`La contraseña de ${Nombre} se actualizo satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

module.exports= {getHeroe,getHeroeByID,deleteHeroeByID,addHeroe,updateHeroeByNombre,signIn,newPassword}