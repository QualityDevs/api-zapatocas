import  Express  from 'express';
import { consultarOcrearUsuario, createUser, deleteUser, editUser, queryAllUsers } from '../controllers/users/users.js';


const rutasUser = Express.Router();

const genericCallback = (response) => (err, result) =>{
        if (err) {
            response.sendStatus(500).send(err.toString());
        } else {
            response.json(result)
        }
};

rutasUser.route('/users/self').get((req, res) => {
  consultarOcrearUsuario(req, genericCallback(res))
});

rutasUser.route('/users').get((req, res) => {
  queryAllUsers(genericCallback(res));
});

rutasUser.route('/users/delete').delete((req, res) =>{
   deleteUser(req.body, genericCallback(res));
});

rutasUser.route('/users/edit').patch((req, res)=>{
   editUser(req.body, genericCallback(res));

});

rutasUser.route('/users/new').post((req, res) => {
       createUser(req.body, genericCallback(res));
});

export default rutasUser;