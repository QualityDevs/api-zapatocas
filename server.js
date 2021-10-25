import Express from 'express';
import Cors from 'cors';
import { conectarBD } from './db/conn.js';
import dotenv from 'dotenv';
import rutasProducto from './rutes/producto.js';
import rutasUser from './rutes/usuarios.js';
import rutasSales from './rutes/ventas.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa'; 

dotenv.config({ path: './config.env'});

const puerto = process.env.PORT || 5000;
const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://autenticacionmintic.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-auteticacion-zapatocas-mintic',
  issuer: 'https://autenticacionmintic.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(rutasProducto);
app.use(rutasUser);
app.use(rutasSales);

const main = () => {
    return app.listen(puerto, () => {
        console.log(`Escuchando puert ${puerto}`);
    });
};

conectarBD(main);