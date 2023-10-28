var connection = require('../config/db');
const { Patient } = require('../models');

const getAllPatients = (req, res) =>{    
  Patient.findAll()
    .then(patients => {
      res.send(patients);
    })
    .catch(err => {
      res.end('{"message": "Internal Server Error", "status" : 500}');
      console.log(err);
    });
}

const createNewPatient = (req, res) =>{
    const patientData = {
        firstName : req.body.txt_firstName,
        middleName : req.body.txt_middleName,
        lastName : req.body.txt_lastName,
        dob : req.body.txt_dob,
        gender : req.body.txt_gender,
        address : req.body.txt_address,
        phoneNumber : req.body.txt_phoneNumber,
        email : req.body.txt_email,
        isActive: 1
      };
    
      
    Patient.create({
      firstName: patientData.firstName,
      middleName: patientData.middleName,
      lastName: patientData.lastName,
      dob: patientData.dob,
      gender: patientData.gender,
      address: patientData.address,
      phoneNumber: patientData.phoneNumber,
      email: patientData.email,
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
const updatePatient = (req, res) => {
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


const getPatient = (req, res) => {
    var patientId = req.params.id;
  console.log("PatientId: ", patientId);

  Patient.findAll({ where : {id: patientId}})
    .then(patients => {
      res.send(patients);
    })
    .catch(err => {
      res.end('{"message": "Internal Server Error", "status" : 500}');
      console.log(err);
    });
}

const deletePatient = (req, res) => {
    var deleteId = req.body.id; 
    Patient.destroy({where: {id: deleteId}})
    .then(() => {
      console.log("Record successfully deleted");
      res.end('{"message": "Record Successfully deleted", "status" : 200}');  
    })
    .catch(err => {
      res.end('{"message": "Internal Server Error", "status" : 500}');
      console.log(err);
    });;

}


module.exports = {getAllPatients, createNewPatient, updatePatient, getPatient, deletePatient};