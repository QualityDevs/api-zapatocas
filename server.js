import Express from 'express';
import Cors from 'cors';
import { conectarBD } from './db/conn.js';
import dotenv from 'dotenv';
import rutasProducto from './rutes/producto.js';


dotenv.config({ path: './config.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Escuchando puert ${process.env.PORT}`);
    });
};

conectarBD(main);