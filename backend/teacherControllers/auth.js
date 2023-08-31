const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

// const login = async (req, res) =>{
//         const { email, password } = req.body;

//         try {
//             const [teacher] = await db.query('SELECT * FROM teachers WHERE email = ?', [email]);
    
//             if (teacher.length === 0) {
//                 return res.status(404).json({ message: 'Teacher not found' });
//             }
    
//             const isPasswordValid = await bcrypt.compare(password, teacher[0].password);
    
//             if (!isPasswordValid) {
//                 return res.status(401).json({ message: 'Incorrect password' });
//             }
    
//             const teacherData = {
//                 id: teacher[0].id,
//                 email: teacher[0].email,
//                 role: 'teacher'
//             };
    
//             const token = jwt.sign(teacherData, JWT_SECRET);
    
//             return res.json({ message: 'Teacher login successful', token });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'An error occurred' });
//         }
// }

const signup = async (req, res) =>{
        const { fullname, gender,email, password,address, phone} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.promise().query(
            'INSERT INTO teachers (fullname,gender, email, password, address, phone) VALUES (?, ?, ?, ?,?,?)',
            [fullname,gender, email, hashedPassword,address, phone]
        );
        const user = await db.promise().query(
         'INSERT INTO account ( email, password, role) VALUES (?, ?, ?)',
           [ email, hashedPassword,"teacher"]
       )
       console.log(user);
        res.json({ message: 'Teacher registered successfully' });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}


module.exports ={
    signup,
    // login
}