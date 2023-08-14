const express = require('express')
const signup = require("../controllers/auth")
const router = express.Router();

router.get('/' , (req,res) =>{
        res.send("<h1>Welcome home page.</h1>")
})
router.post('/register', signup.register);
router.get('/register',signup.getall);

module.exports = router;