// const async = require("hbs/lib/async");
const student = require('../models/student');

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
exports.login = async(req, res, next) =>{
        try{
                let studentId = req.params.student_id;
                let [ ,_] = await student.findById(studentId);
        }
        catch(error){
                console.log(error);
                next(error);
        }
}