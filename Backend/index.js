require('dotenv').config({path:'./.env'})
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const port = 5000;
app.use(express.json());  // convert data in to json object
app.use(cors()); // allow to access data or add data
const Formsurvey = require('./routes/Formsurvey')
const Formfetch = require('./routes/Formfetch')
const Formans = require('./routes/Formans');

mongoose.connect(process.env.mongodb_uri)
 
const connection = mongoose.connection;
 
connection.on("connected", () => {
    console.log("Connection established successfully!!")
})
 

app.use(Formsurvey);
app.use(Formfetch);
app.use(Formans);

app.listen(process.env.PORT || port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})