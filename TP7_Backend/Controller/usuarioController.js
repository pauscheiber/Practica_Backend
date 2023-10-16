require('rootpath')();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usuario_bd = require('Model/usuarioModel.js');

app.get('/', (req, res) => {
    usuario_bd.getUsuario((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
});


app.post('/', (req, res) => {

    let usuario = req.body;
    usuario_bd.createUsuario(usuario, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });

});

app.put('/', (req, res) => {

    let persona = req.body;
    let id = req.params.dni;

    persona_bd.updateUsuario(persona, id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
});

app.delete('/:mail', (req, res) => {

    let id = req.params.mail;

    usuario_bd.deleteUsuario(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (resultado.detail.affectedRows == 0) {
                res.status(404).send(resultado.message);
            } else {
                res.send(resultado.message);
            }
        }
    });
});

app.get('/:mail', (req, res) => {

    let id = req.params.mail;

    usuario_bd.getByEmail(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
});


module.exports = app;
