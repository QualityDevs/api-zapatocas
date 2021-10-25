import { getDB } from "../../db/conn.js";
import { ObjectId } from "mongodb";
import jwt_decode from "jwt-decode";

const queryAllUsers = async (callback) => {
    getDB().collection('usuarios').find({}).toArray(callback);
}

const createUser = async (dataUser, callback) => {
    await getDB().collection('usuarios').insertOne(dataUser, callback);
}

const consultarOcrearUsuario = async(req, callback)=>{
const token=req.headers.authorization.split("Bearer ")[1];
const user = jwt_decode(token)['http://localhost/userData'];
  console.log(user);
  // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
    console.log('response consulta bd', response);
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      user.auth0ID = user._id;
      delete user._id;
      user.rol = 'sin rol';
      //user.estado = 'pendiente';
      await createUser(user, (err, respuesta) => callback(err, user));
    }
  });
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


export {queryAllUsers,createUser,editUser,deleteUser,consultarOcrearUsuario  }