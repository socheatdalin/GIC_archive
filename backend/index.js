require("dotenv").config();
const express = require("express")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')

app.use(cors());
// app.use(function(req, res, next) {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type','x-requested-with');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         next();
// });
app.use(cookieParser());
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// router 
app.use('/', require('./routes'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Listening on port 3001'));
