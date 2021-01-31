// this is for the exercise model table after the exercise
// set mongoose inside the models to pass to mongoDB 
const mongoose = require('mongoose');
// to make all schema is the mongoose schema 
const Schema = mongoose.Schema;
// first create the schema for the exercise include the username and timestamps
const exerciseSchema = new Schema({
    username:{type:String, required:true,},
    description:{type:String, required:true,},
    duration:{type:Number, required:true,},
    date:{type:Date, required:true,},
},{
    timestamps:true,
});
// create the exercise model in mongoose and passing the schema  with the name schema which is exercise
const Exercise = mongoose.model('Exercise', exerciseSchema);
// export the exercise to the server 
module.exports = Exercise;