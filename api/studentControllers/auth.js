const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';


const signup = async (req, res) => {

    const filename = req.file.originalname;
    const filepath = req.file.path;
    const { username, email, gender, password, firstName, lastName, generatiion } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.promise().query(
            'INSERT INTO students (username ,first_name , last_name, email, password,role_id , gender, generation) VALUES ( ?, ?,?, ?,?,?,?,?)',
            [username, firstName, lastName, email, hashedPassword, 2 , gender, generatiion]
        );
        const user = await db.promise().query(
            'INSERT INTO photo ( teacher_id, student_id, file_name, filepath) VALUES ((SELECT  teacher_id From teachers WHERE username = ?), (SELECT  student_id From students WHERE username = ?), ?,?)',
            [null, username, filename, filepath]
        );
        console.log(user);
        res.json({ message: 'Student registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}


module.exports = {
    // login,
    signup
}