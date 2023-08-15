require("dotenv").config();

const express = require("express")
const cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser());
app.use(express.json());
// router 
app.use('/',require('./routes'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Listening on port 3001'));
