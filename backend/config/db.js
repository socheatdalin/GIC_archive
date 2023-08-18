require("dotenv").config();

const mysql = require('mysql2');

const pool = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
});
pool.connect(function (error) {
        if (error) throw error;
        console.log("Connected!");
});
pool.query('CREATE DATABASE IF NOT EXISTS project_gic', (createErr) => {
        if (createErr) {
                console.error('Error creating the database:', createErr);
                return;
        } 

});
pool.query('use project_gic');

var teacherTable = "CREATE TABLE IF NOT EXISTS teachers ( id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(255) NOT NULL,last_name VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";
pool.query(teacherTable, function (err, result) {
        if (err) throw err;
        console.log("Teacher Table created");
});

pool.query("CREATE TABLE IF NOT EXISTS students (id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL,gender VARCHAR(255), address VARCHAR(255), email VARCHAR(225),phone VARCHAR(225), password VARCHAR(255), enrollment_year VARCHAR(255))", (createErr) => {
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }
});
pool.query("CREATE TABLE IF NOT EXISTS account (email VARCHAR(255), password VARCHAR(255) , role VARCHAR(255))", (createErr) => {
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }
});
pool.query("CREATE TABLE IF NOT EXISTS thesis (id INT PRIMARY KEY AUTO_INCREMENT, student_id INT, supervisor_id INT, title VARCHAR(255), field VARCHAR(255), company VARCHAR(255), tags VARCHAR(255), GITHub_Url VARCHAR(255), files VARCHAR(255),FOREIGN KEY (student_id) REFERENCES students(id), FOREIGN KEY (supervisor_id) REFERENCES teachers(id));", (createErr) =>{
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }
        
});

pool.query("CREATE TABLE IF NOT EXISTS courses (id INT PRIMARY KEY AUTO_INCREMENT, teacher_id INT , name VARCHAR(255))", (createErr) =>{
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }
});
// pool.query("CREATE TABLE IF NOT EXISTS pdf_files (filename VARCHAR(255), filepath VARCHAR(255))", (createErr) =>{
//         if (createErr) {
//                 console.error('Error creating the table:', createErr);
//         } else {
//                 console.log('Table created successfully');
//         }
// });
// pool.query("CREATE TABLE IF NOT EXISTS files (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL)", (error) =>{
//         if (error) {
//                 console.error('Error creating the table:', error);
//         } else {
//                 console.log('Table created successfully');
//         }
// })

module.exports = pool.promise();
