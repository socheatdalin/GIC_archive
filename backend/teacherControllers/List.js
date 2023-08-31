const db = require("../config/db");

const displayAll = async (req, res) => {

        const sqlQuery = 'SELECT * FROM teachers';

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
        const selectQuery = 'SELECT * FROM teachers WHERE id= ?';

        db.query(selectQuery, [id], (err, results) => {
                if (err) {
                        console.error('Error fetching teacher:', err);
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
        const query = "Select * from teachers where last_name like '%?%' ";
        db.query(query, [name], (err, results) => {
                if (err) {
                        console.error('Error fetching teacher:', err);
                }
                else {
                        if (results.length > 0) {
                                const student = results[0];
                                console.log('teacher:', student);
                                res.send(results);
                        } else {
                                console.log('teacher not found');
                        }
                }
        })
}
const update = async (req, res) => {
        const id = req.params.id;
        const { fullname, gender, address, email, phone } = req.body;
        // const address = req.body.address;
        // const gender = req.body.gender;
        db.query('Update teachers SET fullname =?, gender=?, address=?, email=?,phone=?  WHERE  id = ?', [fullname, gender, address, email, phone, id], (err, results) => {
                if (err) {
                        console.error('Error updating student:', err);
                } else {
                        console.log('Teacher updated successfully');
                        res.send('Teacher updated successfully')
                        console.log(results);
                }
        })

}

const delectStudent = async (req, res) => {
        const id = req.params.id;
        db.query('DELETE FROM teachers WHERE  id = ?', [id], (err, results) => {
                if (err) {
                        console.error('Error updating teacher:', err);
                } else {
                        console.log('teacher delete successfully');
                        console.log(results);
                }
        })
}
module.exports = {
        displayAll,
        getbyId,
        getbyName,
        update,
        delectStudent
}