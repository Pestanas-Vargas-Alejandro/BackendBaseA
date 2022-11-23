const { request, response, json } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require ("../db/connection")
const {modeloUsuarios, updateUsuario} = require("../models/usuarios");

const getUser = async (req=request, res=response) =>{
    let conn;

    try {
        conn = await pool.getConnection()
        const users = await conn.query(modeloUsuarios.queryGetUsers, (error)=>{throw new error})
        if (!users){
            res.status(404).json ({msg: "No se encontraron registros"})
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


const getUserByID = async (req=request, res=response) =>{
    const {id}= req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [user] = await conn.query(modeloUsuarios.queryGetUserByID, [id], (error)=>{throw new error})

        if (!user){
            res.status(404).json ({msg: `No se encontraron registros con el ID ${id}`})
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

const deleteUserByID = async (req=request, res=response) =>{
    const {id}= req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloUsuarios.queryDeleteUserByID, [id], (error)=>{throw new error})
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo eliminar el usuario con el ID ${id}`})
            return
        } 

        res.json({msg:`El usuario con el ID ${id} se elimno satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const addUser = async (req=request, res=response) =>{
    const {
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento = '1990-01-01',
        Activo
    }= req.body

    if(
        !Usuario|| 
        !Nombre|| 
        !Apellidos|| 
        !Edad|| 
        !Genero||
        !Contrasena|| 
        !Activo 
     ) {
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.queryUserExists, [Usuario])
        if (user){
            res.status(403).json({msg:`El usuario ${Usuario} ya se encuentra registrado`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena,salt)

        const {affectedRows} = await conn.query(modeloUsuarios.queryAddUser, [
            Usuario,
            Nombre,
            Apellidos,
            Edad,
            Genero || '',
            contrasenaCifrada,
            Fecha_Nacimiento,
            Activo
        ], (error)=>{throw new error})

        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo eagregar el registro del usuario ${Usuario}`})
            return
        } 
        res.json({msg:`El usuario ${Usuario} se agrego satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

const updateUserByUsuario = async (req=request, res=response) =>{
    const {
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Fecha_Nacimiento = '1990-01-01'
    }= req.body

    if(
        !Usuario|| 
        !Nombre|| 
        !Apellidos|| 
        !Edad
     ) {
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.queryGetUserInfo, [Usuario])

        if (!user){
            res.status(403).json({msg:`El usuario ${Usuario} no se encuentra registrado`})
            return
        }

        const {affectedRows} = await conn.query(updateUsuario(
            Nombre,
            Apellidos,
            Edad,
            Genero,
            Fecha_Nacimiento,
            Usuario
         ) , (error)=>{throw new error})
        
        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo actualizar el registro del usuario ${Usuario}`})
            return
        } 
        res.json({msg:`El usuario ${Usuario} se actualizo satisfactoriamente`})
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
        Usuario,
        Contrasena
    }= req.body

    if(
        !Usuario|| 
        !Contrasena
     ) {
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.querySignIn, [Usuario])
        if (!user || user.Activo === 'N' ){
            let code = !user ? 1 :2;
            res.status(403).json({msg:`El Usuario o la Contraseña son incorrectos`,errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena, user.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El Usuario o la Contraseña son incorrectos`, errorCode:3})
            return
        }

        res.json({msg:`El usuario ${Usuario} ha iniciado sesión satisfactoriamente`})
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
        Usuario,
        AContrasena,
        NContrasena
    }= req.body

    if(
        !Usuario|| 
        !AContrasena||
        !NContrasena
     ) {
        res.status(400).json({msg:"Faltan datos"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloUsuarios.querySignIn, [Usuario])
        if (!user || user.Activo === 'N' ){
            let code = !user ? 1 :2;
            res.status(403).json({msg:`El Usuario o la Contraseña son incorrectos`,errorCode:code})
            return
        }

        const datosValidos = bcryptjs.compareSync(AContrasena, user.Contrasena)

        if(!datosValidos){
            res.status(403).json({msg:`El Usuario o la Contraseña son incorrectos`, errorCode:3})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(NContrasena,salt)

        const {affectedRows} = await conn.query(modeloUsuarios.queryUpdatePassword, [
            contrasenaCifrada,
            Usuario
        ], (error)=>{throw new error})

        if (affectedRows === 0){
            res.status(404).json ({msg: `No se puedo actualizar la contraseña de ${Usuario}`})
            return
        } 

        res.json({msg:`La contraseña de ${Usuario} se actualizo satisfactoriamente`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally{
        if (conn){
            conn.end()
        }
    }
}

module.exports= {getUser,getUserByID,deleteUserByID,addUser,updateUserByUsuario,signIn,newPassword}