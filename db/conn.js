import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';


dotenv.config({ path: './config.env'});
const stringConexion = process.env.DATABASE_URL;
const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let BaseDatos;

const conectarBD = (callback) => {
  client.connect((err, db) => {
    if (err) {
        console.error('Error al conectarse con la base de datos');
    }
    BaseDatos = db.db('tienda');
    console.log('Conectado con la base de datos');
  return callback();
});
}

const getDB = () =>{
   return BaseDatos;
};

export {conectarBD, getDB};