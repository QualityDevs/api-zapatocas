import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env'});

let conexion;

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/productos', (req, res) => {
    conexion.collection('productos').find({}).toArray((error, result) => {
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
    conexion.collection('productos').deleteOne(filtro, (err, result) => {
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
     conexion.collection('productos').findOneAndUpdate(filtro, operacion,{upsert: true}, (error, result) => {
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
            conexion.collection('productos').insertOne(datosproducto, (error, result) => {
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
    client.connect((err, db) => {
        if (err) {
            console.error('Error al conectarse con la base de datos');
        }
        conexion = db.db('tienda');
        console.log('Conectado con la base de datos');
        return app.listen(process.env.PORT, () => {
            console.log(`Escuchando puert ${process.env.PORT}`);
        });
    });
};

main();