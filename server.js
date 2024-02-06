require("dotenv").config(); 
require('./config/dbConnection')

const userRouter = require('./routes/userRoutes')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') 
const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use('/api', userRouter);

// error handling
app.use((error,req,res,next) => {
	error.statusCode = error.statusCode || 500;
	error.message = error.message || "Internal Server Error";
	res.status(error.statusCode).json({
		message:error.message
	});
});

app.listen(5000, () => console.log('Server is running on 5000 port number'))