const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/route')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

require("./config/database").connect();
app.use(cors());

app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () =>{
    console.log(`App is listening at ${PORT}`)
});