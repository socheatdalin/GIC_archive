require("dotenv").config();

const express = require("express")
const app = express();

app.use(express.json());
// router 
app.use('/', require('./routes'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Listening on port 3001'));
