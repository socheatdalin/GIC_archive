const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require("../config/db");
const upload_file = require('express-fileupload');
const student = require('../studentControllers/auth');
const studentList = require('../studentControllers/crudStudent');
const teacher = require('../teacherControllers/auth');
const teachers = require('../teacherControllers/crudTeacher');
const con = require('../controllers/auth');
const thesis = require('../studentControllers/Thesis');
const course = require('../controllers/course');
const project = require('../studentControllers/team_project');
const role = require('../controllers/role');
const fs = require('fs');
const moment = require('moment');
const router = express.Router();

const storage = multer.diskStorage({
        destination: (req, file, cb) => {
                if (file.fieldname === 'image') {
                        cb(null, 'images')
                }
                else if (file.fieldname === 'file') {
                        cb(null, 'uploads')
                }
        },
        filename: (req, file, cb) => {
                cb(null, file.originalname)
        }
})
// const photo = multer({ storage: storage })
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
        res.send("<h1>Welcome home page.</h1>")
});
router.post('/login', con.login);
router.post('/signup/teacher', upload.single('image'), teacher.signup);
router.post('/signup/student', upload.single('image'), student.signup);

//student 
router.get('/student/all', studentList.displayAll);
router.get('/student/:id', studentList.getbyId);
router.post('/student/name', studentList.getbyName);
router.post('/student/delete/:id', studentList.delect);
router.post('/student/update/:id', studentList.update);

//teacher-
router.get('/teacher/all', teachers.DisplayAll);
router.post('/teacher/update', teachers.upadate);
router.post('/teacher/delete/:id', teachers.remove);
router.get('/teacher/:id', teachers.getById);
router.post('/teacher/name', teachers.getByName);
//file
// router.use(upload_file());
router.get('/upload', (req, res) => {
        res.sendFile(__dirname + '/index.html');
});
//thesis
// router.post('/thesis/create', upload.single('file'), thesis.create);
router.post('/thesis/create', upload.single('file'), async (req, res) => {

        // const pdfMimeType = req.file.mimetype;
        // const pdfFilePath = req.file.path;
        // const filename = req.file.originalname;
        // const date = moment(Date()).format("YYYY-MM-DD hh:mm:ss");
        const date = moment().format("YYYY-MM-DD hh:mm:ss");
        const { title, username, descr, field, company, tags, github_url } = req.body;

        try {
                // Insert into 'thesis' and reference 'courses' and 'documents' tables
                db.promise().query(
                        'INSERT INTO thesis(title, student_id, descr, field, company, tags, github_url, doc_id) VALUES (?,(SELECT student_id FROM students WHERE username =?),?,?,?,?,?,(SELECT doc_id FROM documents WHERE filepath =?))',
                        [title, username, descr, field, company, tags, github_url, req.file.path]
                );

                // Insert into 'documents' table
                 db.promise().query(
                        'INSERT INTO documents(fileName, filepath, filetype, upload_date) VALUES (?,?,?,?)',
                        [req.file.originalname, req.file.path, req.file.mimetype, date]
                );

                res.json({ message: 'Create successful' });
        }
        catch (error) {
                console.error('Error creating thesis and documents:', error);
                res.status(500).json({ message: 'An error occurred while creating the thesis and documents.' });
        }
});
router.get('/thesis/all', thesis.displayThesis);
router.get('/thesis/all/:id', thesis.displayById);
router.post('/thesis/field', thesis.SearchbyField);
router.post('/thesis/delete/:id', thesis.remove);

//course
router.get('/course/all', course.displayAll);
router.get('/course/:id', course.getbyId);
router.post('/course/create', course.create);
router.post('/course/remove/:id', course.remove);
router.post('/course/update', course.update);
//role
router.get('/role/all', role.displayAll);
router.get('/role/:id', role.getbyId);
router.post('/role/create', role.create);
router.post('/role/remove/:id', role.remove);
router.post('/role/update/:id', role.update);

//project
// router.post('/project/create', upload.single('pdf'), project.create);
router.get('/project/all', project.displayAll);
router.post('/project/create', upload.single('file'), project.create);
router.post('/team_project/update', project.update);
router.post('/team_project/delete/:id', project.remove);
router.get('/team_project/:id', project.displayById);

module.exports = router;