const multer = require('multer');
const db = require('../config/db')

const Upload = async (req, res) => {
        // handle storage using multer
        // var storage = multer.diskStorage({
        //         destination: function(req, file, cb){
        //                 cb(null, 'upload');
        //         },
        //         filename: function(req, file, cb){
        //                 cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`);
        //         }
        // });

        // const file = req.file;
        // const {title, student , supervisor, field, company, tags, gitHib_url, photo} = req.body;
        // if (!file) {
        //         return res.status(400).send({ message: 'Please upload a file.' });
        // }
        // try{
        //         await db.query('INSERT INTO thesis(title, student , supervisor, field, company, tags, gitHib_url, photo) VALUES (?,?,?,?,?,?,?,?)',
        //         [title, student , supervisor, field, company, tags, gitHib_url, req.file.filename ]
        //         );
        // }
        // catch(error){
        //         console.error('Upload error:', error);
        //         res.status(500).json({ message: 'Upload failed' });
        // }

       
}
module.exports = {Upload}