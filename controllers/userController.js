var connection = require('../config/db');
const { User } = require('../models');

const getAllUsers = (req, res) =>{    
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.end('{"message": "Internal Server Error", "status" : 500}');
      console.log(err);
    });
}

const createNewUser = (req, res) =>{
    const userData = {
        username : req.body.txt_username,
        password : req.body.txt_password,
        isActive: 1
      };
    
    User.create({
      username: userData.username,
      password: userData.password,
      isActive: true
    }).then(()=>{
      console.log("Record successfully saved");
      res.end('{"message": "Record Successfully saved", "status" : 200}'); 
    })
    .catch(err => {
      if(err){
        res.end('{"message": "Internal Server Error", "status" : 500}');
        console.log(err);
      }
    });

}

//TODO change me to sequelize
const updateUser = (req, res) => {
    userId = req.body.id;
    userUsername = req.body.username;
    userPass = req.body.password;
  
    console.log("UserID: ", userId,"\nusername: ", userUsername, "\npassword: ", userPass);
  
    connection.query("UPDATE users SET username= ?,password= ? WHERE id= ?", [userUsername, userPass, userId], (err, result) =>{
      if(err){
        console.log(err, '{"message": "Internal Server Error", "status" : 500}');
        res.end('{"message": "Internal Server Error", "status" : 500}');   
      } else {
        console.log(`User Updated successfully!`);
        res.end(`{"message": "User Updated successfully!", "status" : 200 }`); 
      }
    });
}


const getUser = (req, res) => {
    var userId = req.params.id;
  console.log("UserID: ", userId);

  User.findAll({ where : {id: userId}})
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.end('{"message": "Internal Server Error", "status" : 500}');
      console.log(err);
    });
}

const deleteUser = (req, res) => {
    var deleteId = req.body.id; 
    User.destroy({where: {id: deleteId}})
    .then(() => {
      console.log("Record successfully deleted");
      res.end('{"message": "Record Successfully deleted", "status" : 200}');  
    })
    .catch(err => {
      res.end('{"message": "Internal Server Error", "status" : 500}');
      console.log(err);
    });;

}


module.exports = {getAllUsers, createNewUser, updateUser, getUser, deleteUser};