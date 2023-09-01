const express = require('express');
const multer = require('multer');

const student = require('../studentControllers/auth');
const studentList = require('../studentControllers/List');
const teacherList = require('../teacherControllers/List');
const teacher = require('../teacherControllers/auth');
const con = require('../controllers/auth');
const thesis = require('../studentControllers/Thesis');
const course = require('../controllers/course');
const team_project = require('../studentControllers/team_project');
const fs = require('fs');
const path = require('path');
const db = require("../config/db");
const upload_file = require('express-fileupload');

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
router.post('/student/delete/:id', studentList.deleteStudent);
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
router.post('/thesis/delete/:id', thesis.remove);

//course
router.post('/create/course', course.create);
router.get('/course/all', course.displayAll);
router.post('/course/update/:id',course.update);
router.post('/course/delete/:id',course.remove);
router.get('/course/:id',course.getbyId);

// team_project
router.get('/team_project/all', team_project.displayAll);
router.get('/team_project/:id',team_project.displayById);
router.post('/create/team_project',team_project.create);
router.post('/team_project/update/:id', team_project.update );
router.post('/team_project/delete/:id', team_project.remove);


module.exports = router;