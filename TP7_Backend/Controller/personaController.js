require('rootpath')();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const persona_bd = require('Model/personaModel.js')

app.get('/', (req, res) => {

    persona_bd.getPersona((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });

});

app.post('/', (req, res) => {

    let persona = req.body;
    persona_bd.createPersona(persona, (err, resultado) => {
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

    persona_bd.updatePersona(persona, id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
});

app.delete('/:dni', (req, res) => {

    let id = req.params.dni;

    persona_bd.deletePersona(id, (err, resultado) => {
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

app.get('/:dni', (req, res) => {

    let id = req.params.dni;

    persona_bd.getByPersona(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
});

app.get('/user/:dni', (req, res) => {

    let id = req.params.dni;

    persona_bd.getUser(id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
});

module.exports = app;

