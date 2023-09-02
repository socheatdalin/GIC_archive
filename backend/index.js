require("dotenv").config();
const express = require("express")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')

const corsOptions = {
        origin: '*',
        // origin: 'http://localhost:3003',
        credentials: true,
};
// app.use(cors());
app.use(cors(corsOptions));
// app.use(function(req, res, next) {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type','x-requested-with');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         next();
// });
app.use('/static/uploads', express.static('uploads'))
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// router 
app.use('/', require('./routes'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Listening on port 3001'));


