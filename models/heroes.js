const modeloUsuarios = {
    queryGetUsers:"SELECT * FROM Heroes",
    queryGetUserByID: `SELECT * FROM Heroes WHERE ID = ?`,
    queryDeleteUserByID: `UPDATE Heroes SET Status ='N' WHERE ID = ?`,
    queryUserExists: `SELECT Nombre FROM Heroes WHERE Nombre = ?`,
    queryAddUser: `
    INSERT INTO Heroes (
        Status,
        Nombre,
        Contrasena,
        Rol,
        H_Max,
        Nacionalidad
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `,
    queryGetUserInfo: `
    SELECT Nombre, Rol, H_Max, Nacionalidad
    FROM Heroes 
    WHERE Nombre = ?
    `,
    queryUpdateByNombre: `
    UPDATE Heroes SET
        Rol = ?,
        H_Max = ?,
        Nacionalidad = ?
    WHERE Nombre = ?
    `,
    querySignIn: `SELECT Nombre, Contrasena, Status FROM Heroes WHERE Nombre = ?`,
    queryUpdatePassword: `
    UPDATE Heroes SET
        Contrasena = ?
    WHERE Nombre = ?
    ` 
}

module.exports = modeloUsuarios