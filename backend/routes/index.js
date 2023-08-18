const express = require('express')
const student = require('../studentControllers/auth')
const teacher = require('../teacherControllers/auth')
const db = require('../config/db')
const con = require('../controllers/auth')
const multer = require('multer')
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
        res.send("<h1>Welcome home page.</h1>")
})
router.post('/login', con.login);
router.post('/signUp/teacher', teacher.signup);
router.post('/signup/student', student.signup);

const upload = multer({ dest: 'uploads/' });
// router.post('/upload', upload.single('pdf'), (req, res) => {
//         const pdfPath = req.file.path;
//         const pdfData = fs.readFileSync(pdfPath);
      
//         const query = 'INSERT INTO pdf_files (filename, filepath) VALUES (?, ?)';
//         db.query(query, [req.file.originalname, pdfData], (err, results) => {
//           if (err) {
//             console.error('Error saving PDF data:', err);
//             res.status(500).json({ message: 'Error saving PDF data' });
//           } else {
//             fs.unlinkSync(pdfPath); // Delete the temporary file
//             res.status(200).json({ message: 'PDF data saved successfully' });
//           }
//         });
// });

module.exports = router;