require('rootpath')();

var usuario_bd = {};

const mysql = require('mysql');
const configuracion = require('config.json');

//coneccion a base de datos
var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Base de datos conectada');
    }
});

//CRUD: create, read, update, delete

usuario_bd.getUsuario = function (funCallback) {

    var consulta = 'SELECT * FROM usuario';

    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback({
                message: 'Error al consultar la base de datos',
                detail: err
            });
            return;
        } else {
            funCallback(rows);
        }
    });
}

usuario_bd.createUsuario = function (usuario, funCallback) {

    var consulta = 'INSERT INTO usuario (mail, nickname, password, persona) values (?,?,?,?)';
    parametros = [usuario.mail, usuario.nickname, usuario.password, usuario.persona];

    connection.query(consulta, parametros, (err, rows) => {
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                funCallback({
                    message: 'Los datos ingresados ya existen',
                    detail: err
                });
            } else {
                funCallback(err);
            }
        } else {
            funCallback(undefined, {
                message: `Se creo el usuario ${usuario.nickname}`,
                detail: rows
            });
        }
    });
};

usuario_bd.updateUsuario = function (usuario, funCallback) {

    var consulta = 'UPDATE usuario SET nikname = ?, password = ? WHERE mail = ?';
    parametros = [usuario.nickname, usuario.password, usuario.mail];

    connection.query(consulta, parametros, (err, rows) => {
        if (err) {
            funCallback({
                message: 'Error al consultar la base de datos',
                detail: err
            });
        } else {
            funCallback(undefined, {
                message: `Se modifico el usuario con email: ${usuario.mail}`,
                detail: rows
            });
        }
    });
};

usuario_bd.deleteUsuario = function (usuario, funCallback) {

    var consulta = 'DELETE FROM usuario WHERE mail = ?';
    parametros = usuario.mail

    connection.query(consulta, parametros, (err, rows) => {
        if (err) {
            funCallback(err);
        } else {
            funCallback(undefined, {
                message: 'Usuario eliminado',
                detail: result
            });
        }
    });
};

//getByEmail

usuario_bd.getByEmail = function (usuario, funCallback) {

    var consulta = 'SELECT * FROM usuario WHERE mail=?';
    parametros = usuario.mail

    connection.query(consulta, parametros, (err, rows) => {
        if (err) {
            funCallback({
                menssage: 'Ha ocurrido algún error inesperado al buscar el usuario',
                detail: err
            });
        } else if (result.length == 0) { 
            funCallback(undefined, {
                menssage: `No se encontro un usuario con el Email: ${usuario.mail}`,
                detail: result
            });
        } else {

            funCallback(undefined, {
                menssage:`Los datos del usuario con el Email ${usuario.mail} son:`,
                detail: result
            });
        }
    });
};

module.exports = usuario_bd;