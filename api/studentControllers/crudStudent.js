const db = require("../config/db");

const displayAll = async (req, res) => {

        const sqlQuery = 'SELECT * FROM students';

        db.query(sqlQuery, (error, results) => {
                if (error) {
                        console.error('Error executing query:', error);
                        return;
                }
                else {
                        res.send(results);
                }
                console.log(results);
        });
}
const getbyId = async (req, res) => {
        const id = req.params.id;
        const selectQuery = 'SELECT * FROM students WHERE student_id= ?';

        db.query(selectQuery, [id], (err, results) => {
                if (err) {
                        console.error('Error fetching student:', err);
                }
                else {
                        if (results.length > 0) {
                                const student = results[0];
                                console.log('Student:', student);
                                res.send(results);
                        } else {
                                console.log('Student not found');
                        }
                }
        })
}
const getbyName = async (req, res) => {
        const name = req.body.name;
        const query = "Select * from students where fullname like '%?%' ";
        db.query(query, [name], (err, results) => {
                if (err) {
                        console.error('Error fetching student:', err);
                }
                else {
                        if (results.length > 0) {
                                const student = results[0];
                                console.log('Student:', student);
                                res.send(results);
                        } else {
                                console.log('Student not found');
                        }
                }
        })
}
const update = async (req, res) => {
        const id = req.params.id;
        const { fullname, gender, address, email, phone } = req.body;
        // const address = req.body.address;
        // const gender = req.body.gender;
        db.query('Update students SET fullname =?, gender=?, address=?, email=?,phone=?  WHERE  id = ?', [fullname, gender, address, email, phone, id], (err, results) => {
                if (err) {
                        console.error('Error updating student:', err);
                } else {
                        console.log('Student updated successfully');
                        res.send('Student updated successfully')
                        console.log(results);
                }
        })

}

const delect = async (req, res) => {
        const id = req.params.id;
        db.query('DELETE FROM students WHERE  id = ?', [id], (err, results) => {
                if (err) {
                        console.error('Error updating student:', err);
                } else {
                        console.log('Student delete successfully');
                        console.log(results);
                }
        })
}
module.exports = {
        displayAll,
        getbyId,
        getbyName,
        update,
        delect
}