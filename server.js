import Express from 'express';
import Cors from 'cors';
import { conectarBD, getDB } from './db/conn.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/productos', (req, res) => {
    getDB().collection('productos').find({}).toArray((error, result) => {
        if (error) {
            res.sendStatus(500).send('Error buscando productos');
        } else {
            res.json(result)
        }
    });
});

app.delete('/productos/delete', (req, res) =>{
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


app.patch('/productos/edit', (req, res)=>{
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

app.post('/productos/new', (req, res) => {
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



const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Escuchando puert ${process.env.PORT}`);
    });
};

conectarBD(main);