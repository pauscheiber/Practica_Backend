require('rootpath')();

var persona_bd = {};

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

persona_bd.getPersona = function (funCallback) {

    var consulta = 'SELECT * FROM persona';

    connection.query(consulta, (err, rows) => {
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

persona_bd.createPersona = function (persona, funCallback) {

    var consulta = 'INSERT INTO persona (dni, nombre, apellido) values (?,?,?)';
    parametros = [persona.dni, persona.nombre, persona.apellido];

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
                message: `Se creo la persona ${persona.nombre} ${persona.apellido}`,
                detail: rows
            });
        }
    });
};

persona_bd.updatePersona = function (persona, funCallback) {

    var consulta = 'UPDATE persona SET nombre = ?, apellido = ? WHERE dni = ?';
    parametros = [persona.nombre, persona.apellido, persona.dni];

    connection.query(consulta, parametros, (err, rows) => {
        if (err) {
            funCallback({
                message: 'Error al consultar la base de datos',
                detail: err
            });
        } else {
            funCallback(undefined, {
                message: `Se modifico la persona con dni: ${persona.dni}`,
                detail: rows
            });
        }
    });
};

persona_bd.deletePersona = function (persona, funCallback) {

    var consulta = 'DELETE FROM persona WHERE dni = ?';
    parametros = persona.dni

    connection.query(consulta, parametros, (err, rows) => {
        if (err) {
            funCallback(err);
        } else {
            funCallback(undefined, {
                message: 'Persona eliminada',
                detail: result
            });
        }
    });
};


//getByPersona

persona_bd.getByPersona = function (persona, funCallback) {

    var consulta = 'SELECT * FROM persona WHERE dni=?';
    parametros = persona.dni

    connection.query(consulta, parametros, (err, rows) => {
        if (err) {
            funCallback({
                menssage: 'Ha ocurrido algún error inesperado al buscar la persona',
                detail: err
            });
        } else if (result.length == 0) {
            funCallback(undefined, {
                menssage: `No se encontro una persona con el DNI: ${persona.dni}`,
                detail: result
            });
        } else {

            funCallback(undefined, {
                menssage: `Los datos de la persona con el dni ${persona.dni} son:`,
                detail: result
            });
        }
    });
};

//getUser

persona_bd.getUser = function (persona, funCallback) {

    var consulta = 'SELECT persona.dni, usuario.nickname FROM usuario INNER JOIN persona ON persona.dni=usuario.persona AND persona.dni=?';
    parametros = persona.dni

    connection.query(consulta, parametros, (err, rows) => {
        if (err) {
            funCallback({
                menssage: 'Ha ocurrido algún error inesperado al realizar la consulta',
                detail: err
            });
        } else if (result.length == 0) {
            funCallback(undefined, {
                menssage: `No se encontro una persona con el DNI: ${persona.dni}`,
                detail: result
            });
        } else {

            funCallback(undefined, {
                menssage: `El nickname del usuario con el dni ${persona.dni} es: ${result[1]['usuario.nickname']}`,
                detail: result
            });
        }
    });
};

module.exports = persona_bd;