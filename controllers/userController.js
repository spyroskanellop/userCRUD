var connection = require('../config/db');


const getAllUsers = (req, res) =>{
    connection.query('SELECT * FROM users ORDER BY id', function(err, row){
        if(err){
          console.log("Error loading Data");
          res.end("Error loading Data");      
        } else {
          console.log(row);
          res.send(row);
        }
      })
}

const createNewUser = (req, res) =>{
    const userData = {
        username : req.body.txt_username,
        password : req.body.txt_password,
        isActive: 1
      };
      console.log(userData);
    
      connection.query("INSERT INTO users SET?", userData, function(err, result){
        if(err){
          console.log(err, '{"message": "Internal Server Error", "status" : 500}');
          res.end('{"message": "Internal Server Error", "status" : 500}'); 
        } else {
          console.log("Record successfully saved");
          res.end('{"message": "Record Successfully saved", "status" : 200}'); 
        }
      });
}

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

  connection.query('SELECT * FROM users WHERE id = ?', userId, function(err, result){
    if(err){
      console.log(err, '{"message": "Internal Server Error", "status" : 500}');
      res.end('{"message": "Internal Server Error", "status" : 500}');   
    } else {
      var data = JSON.stringify(result[0]);

      console.log(`Fetched User successfully! with data ${data}`);
      res.send(`{"message": "Fetched User successfully!", "status" : 200, "data": ${data} }`); 
    }
  });
}

const deleteUser = (req, res) => {
    var deleteId = req.body.id;
    connection.query('DELETE FROM users WHERE id = ?', deleteId, function(err, result){
      if(err){
        console.log(err, '{"message": "Internal Server Error", "status" : 500}');
        res.end('{"message": "Internal Server Error", "status" : 500}');   
      }else {
        console.log("Record successfully deleted");
        res.end('{"message": "Record Successfully deleted", "status" : 200}'); 
      }
    });
}


module.exports = {getAllUsers, createNewUser, updateUser, getUser, deleteUser};