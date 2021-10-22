import Express from 'express';
import Cors from 'cors';
import { conectarBD } from './db/conn.js';
import dotenv from 'dotenv';
import rutasProducto from './rutes/producto.js';
import rutasUser from './rutes/usuarios.js';


dotenv.config({ path: './config.env'});

const port = process.env.PORT || 5000;
const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);
app.use(rutasUser)

const main = () => {
    return app.listen(port, () => {
        console.log(`Escuchando puert ${port}`);
    });
};

conectarBD(main);