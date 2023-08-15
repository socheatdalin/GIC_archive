// const async = require("hbs/lib/async");
const student = require('../models/student');
const db = require('../config/db')

exports.register = async (req,res, next) =>{
        // res.send("Please login")
        try{
                let {student_id,name,gender,address,email,phone,password,role} = req.body;
                let signUp = new student(student_id,name,gender,address,email,phone,password,role);
                const register = await signUp.save();
                console.log(signUp);
                res.status(201).json({message: "student create ",register})
                // res.json({});
        }
        catch(error){
                console.log(error);
                next(error);
        }
       

        // res.send("hello");
}

exports.getall = async(req,res,next) =>{
        try{
                const students = await student.findAll();
                // console.log(students);
                res.status(200).json({students})
        }
        catch(error){
                console.log(error);
                next(error);
        }
}
exports.login = (req, res, next) =>{
        let email = req.body.email;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM accounct WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			// if (error) throw error;
			// // If the account exists
			// if (results.length > 0) {
			// 	// Authenticate the user
			// 	req.session.loggedin = true;
			// 	req.session.email = email;
			// 	// Redirect to home page
				res.send('Login successful');
			// } else {
			// 	res.send('Incorrect Email and/or Password!');
			// }			
			// res.end();
		});
	} else {
		res.send('Please enter Email and Password!');
		res.end();
	}
}