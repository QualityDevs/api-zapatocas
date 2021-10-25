import { getDB } from "../../db/conn.js";
import { ObjectId } from "mongodb";

const queryAllSales = async (callback) => {
    getDB().collection('ventas').find({}).toArray(callback);
}

const createSales = async (dataSales, callback) => {
        getDB().collection('ventas').insertOne(dataSales, callback);
}

const editSales = async (dataSales, callback) => {
    const filtro = {_id: new ObjectId(dataSales.id)};
    delete dataSales.id;
    const operacion ={ $set: dataSales}
    getDB().collection('ventas').findOneAndUpdate(filtro, operacion, callback);
}

const deleteSales = async (dataSales, callback) => {
    const filtro = {_id: new ObjectId(dataSales.id)};
    delete dataSales.id;
    const operacion ={ $set: dataSales};
    getDB().collection('ventas').deleteOne(filtro, operacion, callback);
}


export { queryAllSales, createSales, editSales, deleteSales }