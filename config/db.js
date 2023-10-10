require('dotenv').config();
var mysql = require('mysql2');

// var connection = ({
//     host: `${process.env.DB_HOST}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PASSWORD}`,
//     database: `${process.env.DB_DATABASE}`,
//     port: 3306
// });

var connection = ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_user'
});
var db;
function connectDb(){
    if(!db){
        db = mysql.createConnection(connection);
        db.connect(function(err){
            if(!err){
                console.log("Database connected success");
            } else {
                console.log(err, "Error database connect");
            }
        });
    }
    return db;
}
module.exports = connectDb();