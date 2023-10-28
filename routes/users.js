var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
 
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/:id')
  .get(userController.getUser);  


module.exports = router;
