var express = require('express');
var router = express.Router();
var patientController = require('../controllers/patientController');
 
router.route('/')
  .get(patientController.getAllPatients)
  .post(patientController.createNewPatient)
  .put(patientController.updatePatient)
  .delete(patientController.deletePatient);

router.route('/:id')
  .get(patientController.getPatient);  


module.exports = router;
