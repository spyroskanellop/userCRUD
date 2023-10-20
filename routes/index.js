var express = require('express');
var router = express.Router();
var connection = require('../config/db');

/* GET home page. */
router.get('^/$|index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/*', function(req, res, next) {
  res.status(404).render('404');
});

router.get('/getUsersData', function(req, res, next) {
  connection.query('SELECT * FROM users ORDER BY id', function(err, row){
    if(err){
      console.log("Error loading Data");
      res.end("Error loading Data");      
    } else {
      console.log(row);
      res.send(row);
    }
  })
});

router.post('/saveUser', function(req, res){
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
});

router.delete('/deleteUser', function(req, res){
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
});

router.get("/getUser", function(req, res) {
  var userId = req.query.id;
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

});

router.post('/redirectToRegister', (req, res) => {
  userId = req.body.id;
  username = req.body.username;

  res.send(`{"message": "Fetched User", "status" : 200, "data" : { "id" : ${userId}, "username" : ${username} }}`); 
});



router.post("/updateUser", (req, res) => {
  console.log(req.body.username);
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
});




router.get('/tables', function(req, res, next) {
  res.render('tables', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

module.exports = router;
