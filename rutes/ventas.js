import  Express  from 'express';
import { createSales, deleteSales, editSales, queryAllSales } from '../controllers/sales/sales.js';


const rutasSales = Express.Router();

const genericCallback = (response) => (err, result) =>{
        if (err) {
            response.sendStatus(500).send(err.toString());
        } else {
            response.json(result)
        }
};


rutasSales.route('/sales').get((req, res) => {
  queryAllSales(genericCallback(res));
});

rutasSales.route('/sales/delete').delete((req, res) =>{
   deleteSales(req.body, genericCallback(res));
});

rutasSales.route('/sales/edit').patch((req, res)=>{
   editSales(req.body, genericCallback(res));

});

rutasSales.route('/sales/new').post((req, res) => {
       createSales(req.body, genericCallback(res));
});

export default rutasSales;