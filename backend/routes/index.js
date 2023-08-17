const express = require('express')
const student = require('../studentControllers/auth')
const teacher = require('../teacherControllers/auth')
const admin = require('../controllers/authentication')
const con = require('../controllers/auth')
const thesis = require('../studentControllers/Thesis')
const multer = require('multer')
const router = express.Router();
// var upload = multer({storage: storage});

router.get('/' , (req,res) =>{
        res.send("<h1>Welcome home page.</h1>")
})
router.post('/login',con.login);
// router.get('/register',signup.getall);
router.post('/signUp/teacher', teacher.signup);
router.post('/login/teacher', teacher.login);
router.post('/login/student', student.login);
router.post('/signup/student', student.signup);

// router.post('/student/Thesis/upload',thesis.Upload, upload.single('dataFile'))
// router.use('/upload', express.static('upload'));




module.exports = router;