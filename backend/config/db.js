require("dotenv").config();

const mysql = require('mysql2');

const pool = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
});

pool.query('CREATE DATABASE IF NOT EXISTS project_gic', (createErr) => {
        if (createErr) {
                console.error('Error creating the database:', createErr);
                return;
        }

});
pool.query('use project_gic');

var teacherTable = "CREATE TABLE IF NOT EXISTS teachers ( id INT PRIMARY KEY AUTO_INCREMENT, fullname VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,gender VARCHAR(255), password VARCHAR(255) NOT NULL, address VARCHAR(255),phone VARCHAR(225))";
pool.query(teacherTable, function (err, result) {
        if (err) throw err;
        console.log("Teacher Table created");
});

pool.query("CREATE TABLE IF NOT EXISTS students (id INT PRIMARY KEY AUTO_INCREMENT, fullname VARCHAR(255) NOT NULL,gender VARCHAR(255), address VARCHAR(255), email VARCHAR(225),phone VARCHAR(225), password VARCHAR(255),groupe VARCHAR(255), enrollment_year VARCHAR(255) )", (createErr) => {
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
pool.query("CREATE TABLE IF NOT EXISTS thesis (id INT PRIMARY KEY AUTO_INCREMENT, student_name VARCHAR(255), student_id INT, supervisor_name VARCHAR(255), title VARCHAR(255), field VARCHAR(255), company VARCHAR(255), descr VARCHAR(255), GITHub_Url VARCHAR(255),year INT , files VARCHAR(255))", (createErr) => {
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }

});

pool.query("CREATE TABLE IF NOT EXISTS courses (id INT PRIMARY KEY AUTO_INCREMENT, course_name VARCHAR(255), teacher_id INT , year INT, FOREIGN KEY (teacher_id) REFERENCES teachers(id) )", (createErr) => {
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }
});
pool.query("CREATE TABLE IF NOT EXISTS pdf_files (id INT PRIMARY KEY AUTO_INCREMENT,filename VARCHAR(255), mime_type VARCHAR(255),  data LONGBLOB)", (createErr) => {
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }
});

pool.query("CREATE TABLE IF NOT EXISTS team_project (id INT PRIMARY KEY AUTO_INCREMENT, project_name VARCHAR(255) NOT NULL, student_id INT , descr VARCHAR(255), course_id INT,  FOREIGN KEY (course_id) REFERENCES courses(id),  FOREIGN KEY (student_id) REFERENCES students(id))", (error) => {
        if (error) {
                console.error('Error creating the table:', error);
        } else {
                console.log('Table created successfully');
        }
});

pool.query("CREATE TABLE IF NOT EXISTS files (id INT PRIMARY KEY AUTO_INCREMENT,filename VARCHAR(255), filepath VARCHAR(255))", (createErr) => {
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }
});

// pool.query("CREATE TABLE IF NOT EXISTS files (id INT AUTO_INCREMENT PRIMARY KEY, filename VARCHAR(255) NOT NULL, originalname VARCHAR(255) NOT NULL, path VARCHAR(255) NOT NULL)", (createErr) => {
//                 if (createErr) {
//                         console.error('Error creating the table:', createErr);
//                 } else {
//                         console.log('Table created successfully');
//                 } 
// });
pool.query("CREATE TABLE IF NOT EXISTS studentTest (id INT PRIMARY KEY AUTO_INCREMENT, fullname VARCHAR(255) NOT NULL,gender VARCHAR(255), address VARCHAR(255), email VARCHAR(225),phone VARCHAR(225), password VARCHAR(255),groupe VARCHAR(255), enrollment_year VARCHAR(255), photo VARCHAR(255) )", (createErr) => {
        if (createErr) {
                console.error('Error creating the table:', createErr);
        } else {
                console.log('Table created successfully');
        }
});
module.exports = pool;
