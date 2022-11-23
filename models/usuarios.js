const modeloUsuarios = {
    queryGetUsers:"SELECT * FROM Usuarios",
    queryGetUserByID: `SELECT * FROM Usuarios WHERE ID = ?`,
    queryDeleteUserByID: `UPDATE Usuarios SET Activo ='N' WHERE ID = ?`,
    queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = ?`,
    queryAddUser: `
    INSERT INTO Usuarios (
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `,
    queryGetUserInfo: `
    SELECT Usuario, Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento 
    FROM Usuarios 
    WHERE Usuario = ?
    `,
    queryUpdateByUsuario: `
    UPDATE Usuarios SET
        Nombre = ?,
        Apellidos = ?,
        Edad = ?,
        Genero = ?,
        Fecha_Nacimiento = ?
    WHERE Usuario = ?
    `,
    querySignIn: `SELECT Usuario, Contrasena, Activo FROM Usuarios WHERE Usuario = ?`,
    queryUpdatePassword: `
    UPDATE Usuarios SET
        Contrasena = ?
    WHERE Usuario = ?
    ` 
}

const updateUsuario =(
    Nombre,
    Apellidos,
    Edad,
    Genero,
    Fecha_Nacimiento,
    Usuario
 ) => {
    return `
    UPDATE Usuarios SET
        Nombre = '${Nombre}',
        Apellidos = '${Apellidos}',
        Edad = '${Edad}',
        ${Genero ? `Genero = '${Genero}',`:''}
        Fecha_Nacimiento = '${Fecha_Nacimiento}'
    WHERE Usuario = '${Usuario}'
    `
}

module.exports = {modeloUsuarios, updateUsuario}