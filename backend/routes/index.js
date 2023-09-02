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
const uploads = multer({dest: 'images/'});


router.get('/', (req, res) => {
        res.send("<h1>Welcome home page.</h1>")
});
router.post('/login', con.login);
//teacher
router.post('/signup/teacher', teacher.signup);
router.post('/signup/student', student.signup);
router.get('/teacher/all', teacherList.displayAll);
router.get('/teacher/:id', teacherList.getbyId);

//student 
router.get('/student/all', studentList.displayAll);
router.get('/student/:id', studentList.getbyId);
router.post('/student/name', studentList.getbyName);
router.post('/student/delete/:id', studentList.deleteStudent);
router.post('/student/update/:id', studentList.update);

router.get('/student/create', (req, res) => {
        res.sendFile(__dirname + '/index.html');
});
router.post('/student/create', uploads.single('image'), student.test);

//file
// router.use(upload_file());
router.get('/upload', (req, res) => {
        res.sendFile(__dirname + '/index.html');
});
// const upload = multer({ storage });
// router.post('/upload', upload.single('pdfFile'), async (req, res) => {
//         try {
//                 const { originalname, path } = req.file;

//                 // Insert PDF file path into the database
//                 // const connection = await pool.getConnection();
//                 await db.promise().query('INSERT INTO files (filename,filepath) VALUES (?,?)', [originalname, path]);
//                 // connection.release();

//                 console.log('PDF file path uploaded and inserted into the database.');
//                 // res.redirect('/');
//         } catch (error) {
//                 console.error('Error uploading PDF:', error);
//                 res.status(500).send('Error uploading PDF file.');
//         }
// });
//thesis
router.get('/getall', async (req, res) => {
        db.query('select * from files ', (err, results) => {
                if (err) {
                        console.error('Error fetching files:', err);
                }
                else {
                        res.send(results);
                }
                console.log(results);
        });
});
router.get('/getall/:id', async (req, res) => {
        const id = req.params.id;
        db.query('select filepath from files where id = ?' , [id], (err, results) => {
                if (err) {
                        console.error('Error fetching files:', err);
                }
                else {
                        res.send(results);
                }
                console.log(results);
        });
});
router.post('/upload', upload.single('pdfFile'),thesis.Upload);
router.get('/thesis/all', thesis.displayThesis);
router.get('/thesis/:id', thesis.displayById);
router.post('/thesis/field', thesis.SearchbyField);
router.post('/thesis/delete/:id', thesis.remove);

//course
router.post('/create/course', course.create);
router.get('/course/all', course.displayAll);
router.post('/course/update/:id', course.update);
router.post('/course/delete/:id', course.remove);
router.get('/course/:id', course.getbyId);

// team_project
router.get('/team_project/all', team_project.displayAll);
router.get('/team_project/:id', team_project.displayById);
router.post('/create/team_project', team_project.create);
router.post('/team_project/update/:id', team_project.update);
router.post('/team_project/delete/:id', team_project.remove);


module.exports = router;