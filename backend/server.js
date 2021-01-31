// require all the needed in the express server
const express = require('express');
const cors = require('cors');
// this mongoose to connect the server to the mongoDB
const mongoose = require('mongoose');
// set the env for the configuration
require('dotenv').config();
// the variable to run the express and the port
const app = express();
const port = process.env.PORT|| 5000;
// this is the middleware

app.use(cors());
// to parse json file
app.use(express.json());
// to setup the mongo database
// take the uri from the env process so need to create .env and store the ATLAS_URI variable inside .env by taking the url on mongoDB connect the cluster that has been created and then on choose a connection method set app and copy the url
// inside the url there is '<password>' change this to my password from the cluster 
const uri = process.env.ATLAS_URI;
// connect the mongo url databse to the mongoose
mongoose.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true});
// set the connection that have been connected
const connection = mongoose.connection;
// start the server when open this log should pop and then it is connected to the database
connection.once('open',()=>{
    console.log('Mongo database connection established successfully');
});
// import for the routing for exercise and user
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');
// use the app as following route 
// for this route it will route this data so it is like web and the routes is the controllers the name 'exercisesRouter'
app.use('/exercises',exercisesRouter);
app.use('/users',userRouter);


// this to start the server 
app.listen(port, () =>{
    console.log(`Server is running on port :${port}`);
});