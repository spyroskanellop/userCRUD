var express = require('express');
var router = express.Router();
var app = express();
var connection = require('../config/db');
var userController = require('../controllers/userController');
const db = require("../models");

router.get('^/$|index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/redirectToRegister', (req, res) => {
  userId = req.body.id;
  username = req.body.username;

  res.send(`{"message": "Fetched User", "status" : 200, "data" : { "id" : ${userId}, "username" : ${username} }}`); 
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

db.sequelize.sync().then((req) => {
  app.listen(3001, () => {
    console.log("Server Running");
  });
})

module.exports = router;
