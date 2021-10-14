import { getDB } from "../../db/conn.js";
import { ObjectId } from "mongodb";

const queryAllUsers = async (callback) => {
    getDB().collection('usuarios').find({}).toArray(callback);
}

const createUser = async (dataUser, callback) => {
    if (Object.keys(dataUser).includes('nombre') && Object.keys(dataUser).includes('estado') &&
        Object.keys(dataUser).includes('rol')) {
        getDB().collection('usuarios').insertOne(dataUser, callback);
    } else {
        return "error";
    }

}

const editUser = async (dataUser, callback) => {
    const filtro = { _id: new ObjectId(dataUser.id) };
    delete dataUser.id;
    const operacion = { $set: dataUser };
    getDB().collection('usuarios').findOneAndUpdate(filtro, operacion, callback);
}

const deleteUser = async (dataUser, callback) => {
    const filtro = {_id: new ObjectId(dataUser.id)};
    delete dataUser.id;
    const operacion ={ $set: dataUser};
    getDB().collection('usuarios').deleteOne(filtro, operacion, callback);
}


export {queryAllUsers,createUser,editUser,deleteUser  }