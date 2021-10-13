const express = require('express');
var ObjectID=require('mongodb').ObjectID;


const recordRoutes = express.Router();

const dbo = require('../db/conn')

recordRoutes.route('/producto').get(async function (req,res){
    const dbConnect = dbo.getDb();

    dbConnect
    .collection('productos')
    .find({})
    .limit(50)
    .toArray(function (err, result){
        if (err){
            res.status(400).send('Error al buscar Vehiculos');
        }else{
            res.json(result);
        }
    });

});

module.exports = recordRoutes;