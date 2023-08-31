const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require("../config/db");
const upload_file = require('express-fileupload');
const student = require('../studentControllers/auth');
const studentList = require('../studentControllers/List');
const teacherList = require('../teacherControllers/List');
const teacher = require('../teacherControllers/auth');
const con = require('../controllers/auth');
const thesis = require('../studentControllers/Thesis');
const fs = require('fs');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
        res.send("<h1>Welcome home page.</h1>")
});
router.post('/login', con.login);
//teacher
router.post('/signup/teacher', teacher.signup);
router.post('/signup/student', student.signup);
router.get('/teacher/all',teacherList.displayAll);
router.get('/teacher/:id',teacherList.getbyId);

//student 
router.get('/student/all', studentList.displayAll);
router.get('/student/:id', studentList.getbyId);
router.post('/student/name', studentList.getbyName);
router.post('/student/delete/:id', studentList.delectStudent);
router.post('/student/update/:id', studentList.update);

//file
// router.use(upload_file());
router.get('/upload', (req, res) => {
        res.sendFile(__dirname + '/index.html');
});
//thesis
router.post('/upload', upload.single('pdf'), thesis.Upload);
router.get('/thesis/all', thesis.displayThesis);
router.get('/thesis/:id', thesis.displayById);
router.post('/thesis/field', thesis.SearchbyField);
router.post('/thesis/delete/:id', thesis.delect);
module.exports = router;