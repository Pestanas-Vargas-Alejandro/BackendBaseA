const { request, response, json } = require("express")
const pool = require ("../db/connection")

const getUser = async (req=request, res=response) =>{
    let conn;

    try {
        conn = await pool.getConnection()
        const users = await conn.query("SELECT * FROM Usuarios", (error) => {throw new Error(error)})
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
        const [user] = await conn.query( `SELECT * FROM Usuarios WHERE ID = ${id}`, (error) => {throw new Error(error)})

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
        const {affectedRows} = await conn.query( `UPDATE Usuarios SET Activo ='N' WHERE ID = ${id}`, (error) => {throw new Error(error)})
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
        Contrasena,
        Fecha_Nacimiento = '1990-01-01',
        Activo
    }= req.body

    if(
        !Usuario|| 
        !Nombre|| 
        !Apellidos|| 
        !Edad|| 
        !Contrasena|| 
        !Activo 
     ) {
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }
    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(`SELECT Usuario FROM Usuarios WHERE Usuario = '${Usuario}'`)
        if (user){
            res.status(403).json({msg:`El usuario ${Usuario} ya se encuentra registrado`})
        }

        const {affectedRows} = await conn.query( `
        INSERT INTO Usuarios(
            Usuario,
            Nombre,
            Apellidos,
            Edad,
            Contrasena,
            Fecha_Nacimiento,
            Activo
        ) VALUES (
            '${Usuario}',
            '${Nombre}',
            '${Apellidos}',
             ${Edad},
            '${Contrasena}',
            '${Fecha_Nacimiento}',
            '${Activo}'
        )`
        , (error) => {throw new Error(error)})
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

module.exports= {getUser,getUserByID,deleteUserByID,addUser}