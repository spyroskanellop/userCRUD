var express = require('express');
var router = express.Router();
var connection = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users. */
router.get('/getUsersData', function(req, res, next) {
  console.log("Inside0");
  connection.query('SELECT * FROM users ORDER BY userID DESC', function(req, row){
    if(err){
      console.log("Error loading Data");
      res.end("Error loading Data");      
    } else {
      console.log(row);
      res.send(row);
    }
  })
});

router.post('/saveFormData', function(req, res){
  const userData = {
    username : req.body.txt_username,
    password : req.body.txt_password,
    isActive: 1
  };
  console.log(userData);

  connection.query("INSERT INTO users SET?", userData, function(err, result){
    if(err){
      console.log(err, '{"message": "Internal Server Error", "status" : 500}');
      res.end(err, '{"message": "Internal Server Error", "status" : 500}'); 
    } else {
      console.log("Record successfully saved");
      res.end(err, '{"message": "Record Successfully saved", "status" : 200}'); 
      
    }
  });
});


router.get('/tables', function(req, res, next) {
  res.render('tables', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});



module.exports = router;
