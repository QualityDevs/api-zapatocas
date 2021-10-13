import { getDB } from "../../db/conn.js";
import { ObjectId } from "mongodb";

const queryAllProducts = async (callback) => {
    getDB().collection('productos').find({}).toArray(callback);
}

const createProduct = async (dataProduct, callback) => {
    if (Object.keys(dataProduct).includes('nombre') && Object.keys(dataProduct).includes('descripcion') &&
        Object.keys(dataProduct).includes('vunitario') && Object.keys(dataProduct).includes('estado')) {
        getDB().collection('productos').insertOne(dataProduct, callback);
    } else {
        return "error";
    }

}

const editProduct = async (dataProduct, callback) => {
    const filtro = { _id: new ObjectId(dataProduct.id) };
    delete dataProduct.id;
    const operacion = { $set: dataProduct };
    getDB().collection('productos').findOneAndUpdate(filtro, operacion, callback);
}

const deleteProduct = async (dataProduct, callback) => {
    const filtro = {_id: new ObjectId(dataProduct.id)};
    delete dataProduct.id;
    const operacion ={ $set: dataProduct};
    getDB().collection('productos').deleteOne(filtro, operacion, callback);
}


export { queryAllProducts, createProduct, editProduct, deleteProduct }