const db = require('../config/db')
const moment = require('moment');
const path = require('path');

const create = async (req, res) => {

        const pdfMimeType = req.file.mimetype;
        const pdfFilePath = req.file.path;
        const filename = req.file.originalname;
        // const date = moment(Date()).format("YYYY-MM-DD hh:mm:ss");
        const date = moment().format("YYYY-MM-DD HH:mm:ss");
        const { title, username, descr, field, company, tags, github_url } = req.body;

        try {
                // Insert into 'thesis' and reference 'courses' and 'documents' tables
                await db.promise().query(
                        'INSERT INTO thesis(title, student_id, descr, field, company, tags, github_url, doc_id) VALUES (?,(SELECT student_id FROM students WHERE username =?),?,?,?,?,?,(SELECT doc_id FROM documents WHERE filepath =?))',
                        [title, username, descr, field, company, tags, github_url, pdfFilePath]
                );

                // Insert into 'documents' table
                await db.promise().query(
                        'INSERT INTO documents(fileName, filepath, filetype, upload_date) VALUES (?,?,?,?)',
                        [filename, pdfFilePath, pdfMimeType, date]
                );

                res.json({ message: 'Create successful' });
        }
        catch (error) {
                console.error('Error creating thesis and documents:', error);
                res.status(500).json({ message: 'An error occurred while creating the thesis and documents.' });
        }
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
const SearchbyField = async (req, res) => {
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
const remove = async (req, res) => {
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
        create,
        displayThesis,
        displayById,
        SearchbyField,
        remove
}