const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const [student] = await db.query('SELECT * FROM students WHERE email = ?', [email]);

//         if (student.length === 0) {
//             return res.status(404).json({ message: 'Student not found' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, student[0].password);

//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Incorrect password' });
//         }

//         const studentData = {
//             id: student[0].id,
//             email: student[0].email,
//             role: 'student'
//         };
//         console.log(studentData.role);
        
//         const token = jwt.sign(studentData, JWT_SECRET);

//         return res.json({ message: 'Student login successful', token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred' });
//     }
// }
const signup = async (req, res) => {
    const { fullname, email, gender, password, address, phone, enrollment_year,groupe } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.promise().query(
            'INSERT INTO students (fullname, gender, email, password, address, phone, enrollment_year,groupe) VALUES ( ?, ?,?, ?,?,?,?,?)',
            [fullname, gender, email, hashedPassword, address, phone, enrollment_year,groupe]
        );
        const user = await db.promise().query(
             'INSERT INTO account ( email, password, role) VALUES (?, ?, "student")',
            [ email, hashedPassword]
        )
        console.log(user);
        res.json({ message: 'Student registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const test =  async (req, res) => {
    const { fullname, email, gender, password, address, phone, enrollment_year,groupe, photo } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.promise().query(
            'INSERT INTO studenttest (fullname, gender, email, password, address, phone, enrollment_year,groupe, photo) VALUES ( ?,?, ?,?, ?,?,?,?,?)',
            [fullname, gender, email, hashedPassword, address, phone, enrollment_year,groupe, photo]
        );
        // const user = await db.promise().query(
        //      'INSERT INTO account ( email, password, role) VALUES (?, ?, "student")',
        //     [ email, hashedPassword]
        // )
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
    signup, 
    test
}