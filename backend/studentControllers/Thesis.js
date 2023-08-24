const multer = require('multer');
const db = require('../config/db')
const fs = require('fs');

const Upload = async (req, res) => {
        const pdfFilePath = req.file.path;
        const pdfFileData = fs.readFileSync(pdfFilePath);
        const pdfMimeType = req.file.mimetype;
        // const student_name = 'SELECT last_name FROM students WHERE id =6 ';
        // const query = 'INSERT INTO pdf_files (filename, mime_type, data) VALUES (?, ?, ?)';
        // const values = [req.file.originalname, pdfMimeType, pdfFileData];
        const values = [req.body.name, req.body.student_id, req.body.supervisor_name, req.body.title, req.body.field, req.body.company, req.body.descr, req.body.GITHub_Url ,req.body.year, pdfFileData];
        const query = 'INSERT INTO thesis (student_name, student_id, supervisor_name, title, field, company, descr, GITHub_Url,year, files ) VALUES (?,?,?,?,?,?,?,?,?,?)';

        db.query(query, values, (insertErr, results) => {
                if (insertErr) {
                        console.error('Error inserting PDF file data:', insertErr);
                        res.status(500).send('Internal Server Error');
                } else {
                        console.log('PDF file data inserted successfully');
                        res.status(200).send('Thesis uploaded and saved');
                        console.log(results);
                }
        });


}
const displayThesis = async (req, res) => {

        db.query('select * from thesis ', (err, results) => {
                if (err) {
                        console.error('Error fetching student:', err);
                }
                else {
                        res.send(results);
                }
                console.log(results);
        });
}
const displayById = async (req, res) => {
        const id = req.params.id;
        const selectQuery = 'SELECT * FROM thesis WHERE id= ?';

        db.query(selectQuery, [id], (err, results) => {
                if (err) {
                        console.error('Error fetching thesis:', err);
                }
                else {
                        if (results.length > 0) {
                                const thesis = results[0];
                                console.log('thesis:', thesis);
                                res.send(results);
                        } else {
                                console.log('Thesis not found');
                        }
                }
        });
}
const SearchbyField = async (req, res) =>{
        const field = req.body.field;
        const selectQuery = 'SELECT * FROM thesis WHERE field= ?';

        db.query(selectQuery, [field], (err, results) => {
                if (err) {
                        console.error('Error fetching thesis:', err);
                }
                else {
                        if (results.length > 0) {
                                const thesis = results[0];
                                console.log('thesis:', thesis);
                                res.send(results);
                        } else {
                                console.log('Thesis not found');
                        }
                }
        });
}
const delect = async (req, res) =>{
        const id = req.params.id;
        db.query('DELETE FROM thesis WHERE  id = ?', [id], (err, results) => {
                if (err) {
                        console.error('Error updating student:', err);
                } else {
                        console.log('Thesis delete successfully');
                        res.send('Thesis delete successfully');
                        console.log(results);
                }
        })
}
module.exports = {
        Upload,
        displayThesis,
        displayById,
        SearchbyField,
        delect
}
