require('rootpath')();

const express = require('express');
const app = express();

const configuracion = require('config.json');

const controladorPersona = require('Controller/personaController.js');
const controladorUsuario = require('Controller/usuarioController.js');

app.use('/api/persona', controladorPersona);
app.use('/api/usuario', controladorUsuario);

app.listen(configuracion.server.port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`servidor escuchando en el puerto ${configuracion.server.port}`);
    }
});
