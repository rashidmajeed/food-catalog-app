const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

// connect to mongodb database

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('DB is connected with the web application...'))
.catch(err => console.error(err));

// Intializing application
const app = express();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})