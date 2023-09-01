const db = require('../config/db');

const create = async (req, res) => {
        const { course_name, teacher_id, year } = req.body;

        try {
                const result = await db.promise().query(
                        'INSERT INTO courses (course_name, teacher_id , year) VALUES (?,?,?)',
                        [course_name, teacher_id, year]
                );
                console.log(result);
                res.json({ message: 'Create successfully' });
        }
        catch (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred' });
        }
}
const update = async (req, res) => {
        const id = req.params.id;
        const { course_name, teacher_id, year } = req.body;

        try {
                const result = await db.promise().query(
                        'UPDATE courses SET course_name =? , teacher_id =? , year = ? WHERE  id = ? ',
                        [course_name, teacher_id, year, id]
                );
                console.log(result);
                res.json({ message: 'Update successfully' });
        }
        catch (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred' });
        }
}
const remove = async (req, res) => {
        const id = req.params.id;
        db.query('DELETE FROM courses WHERE  id = ?', [id], (err, results) => {
                if (err) {
                        console.error('Error updating courser:', err);
                } else {
                        res.send('Delete successfully');
                        console.log('Delete successfully');
                        console.log(results);
                }
        })
}
const displayAll = async (req, res) => {

        const sqlQuery = 'SELECT * FROM courses';

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
        const selectQuery = 'SELECT * FROM courses WHERE id= ?';

        db.query(selectQuery, [id], (err, results) => {
                if (err) {
                        console.error('Error fetching course:', err);
                }
                else {
                        if (results.length > 0) {
                                const course = results[0];
                                console.log('Course:', course);
                                res.send(results);
                        } else {
                                console.log('Course not found');
                        }
                }
        })
}
module.exports = {
        create,
        remove,
        displayAll,
        update,
        getbyId
}