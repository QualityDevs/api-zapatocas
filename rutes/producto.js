import  Express  from 'express';
import { createProduct, deleteProduct, editProduct, queryAllProducts } from '../controllers/products/producto.js';


const rutasProducto = Express.Router();

const genericCallback = (response) => (err, result) =>{
        if (err) {
            response.sendStatus(500).send(err.toString());
        } else {
            response.json(result)
        }
};


rutasProducto.route('/productos').get((req, res) => {
  queryAllProducts(genericCallback(res));
});

rutasProducto.route('/productos/delete').delete((req, res) =>{
   deleteProduct(req.body, genericCallback(res));
});

rutasProducto.route('/productos/edit').patch((req, res)=>{
   editProduct(req.body, genericCallback(res));

});

rutasProducto.route('/productos/new').post((req, res) => {
       createProduct(req.body, genericCallback(res));
});

export default rutasProducto;