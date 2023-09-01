const db = require('../config/db');

const create = async (req, res) => {

        const { project_name, student_id, descr, course_id } = req.body;
        try {
                const result = await db.promise().query(
                        'INSERT INTO team_project (project_name, student_id, descr, course_id) VALUES (?,?,?,?)',
                        [project_name, student_id, descr, course_id]
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
        const { project_name, student_id, descr, course_id } = req.body;

        try {
                const result = await db.promise().query(
                        'UPDATE team_project SET project_name =? , student_id =? , descr = ? , course_id =? WHERE  id = ? ',
                        [project_name, student_id, descr, course_id, id]
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
        db.query('DELETE FROM team_project WHERE  id = ?', [id], (err, results) => {
                if (err) {
                        console.error('Error delete project:', err);
                } else {
                        console.log('Team project delete successfully');
                        res.send('Team project delete successfully');
                        console.log(results);
                }
        })
}
const displayAll = async (req, res) => {

        db.query('select * from team_project ', (err, results) => {
                if (err) {
                        console.error('Error fetching team project:', err);
                }
                else {
                        res.send(results);
                }
                console.log(results);
        });
}
const displayById = async (req, res) => {
        const id = req.params.id;
        const selectQuery = 'SELECT * FROM team_project WHERE id= ?';

        db.query(selectQuery, [id], (err, results) => {
                if (err) {
                        console.error('Error fetching team project:', err);
                }
                else {
                        if (results.length > 0) {
                                const thesis = results[0];
                                console.log('team_project:', thesis);
                                res.send(results);
                        } else {
                                console.log('Team project not found');
                        }
                }
        });
}
module.exports = {
        create,
        update,
        remove,
        displayAll,
        displayById
}