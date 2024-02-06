require("dotenv").config(); 
require('./config/dbConnection')

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

// error handling
app.use((error,req,res,next) => {
	error.statusCode = error.statusCode || 500;
	error.message = error.message || "Internal Server Error";
	res.status(error.statusCode).json({
		message:error.message
	});
});

app.listen(5000, () => console.log('Server is running on 5000 port number'))