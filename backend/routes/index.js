const express = require('express')
const signup = require("../controllers/auth")
const con = require("../controllers/authentication")
const student = require('../studentControllers/auth')
const teacher = require('../teacherControllers/auth')
const router = express.Router();

router.get('/' , (req,res) =>{
        res.send("<h1>Welcome home page.</h1>")
})
// router.post('/register', signup.register);
// router.get('/register',signup.getall);
router.post('/signUp/teacher', teacher.signup);
router.post('/login/teacher', teacher.login);
router.post('/login/student', student.login);
router.post('/signup/student', student.signup);



module.exports = router;