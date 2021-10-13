import  Express  from 'express';
import {getDB } from '../db/conn.js';

const rutasProducto = Express.Router();

rutasProducto.route('/productos').get((req, res) => {
    getDB().collection('productos').find({}).toArray((error, result) => {
        if (error) {
            res.sendStatus(500).send('Error buscando productos');
        } else {
            res.json(result)
        }
    });
});

rutasProducto.route('/productos/delete').delete((req, res) =>{
    const edit = req.body;
    const filtro = {_id: new ObjectId(edit.id)};
    getBD().collection('productos').deleteOne(filtro, (err, result) => {
        if (err) {
            res.sendStatus(500).send('Error buscando productos');
        } else {
            res.sendStatus(200);
        }
    });
});

rutasProducto.route('/productos/edit').patch((req, res)=>{
    const edit = req.body;
    const filtro = {_id: new ObjectId(edit.id)};
    delete edit.id;
    const operacion={$set: edit};
     getBD().collection('productos').findOneAndUpdate(filtro, operacion,{upsert: true}, (error, result) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            console.log("Actualizadosssss");
            res.sendStatus(200);
        }
     });
});

rutasProducto.route('/productos/new').post((req, res) => {
    const datosproducto = req.body;
    try {
        if (Object.keys(datosproducto).includes('nombre') &&
            Object.keys(datosproducto).includes('descripcion') &&
            Object.keys(datosproducto).includes('vunitario') &&
            Object.keys(datosproducto).includes('estado')) {
            getDB().collection('productos').insertOne(datosproducto, (error, result) => {
                if (error) {
                    console.error(error);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.status(200).send(result);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
       res.sendStatus(500);
    }
});

export default rutasProducto;