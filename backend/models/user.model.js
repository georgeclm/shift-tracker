// set mongoose inside the models to pass to mongoDB 
const mongoose = require('mongoose');
// to make all schema is the mongoose schema s
const Schema = mongoose.Schema;
// first create the schema for the user include the username and timestamps
const userSchema = new Schema({
    username:{
        // the validation
        type:String,
        required:true,
        unique:true,
        // trim to remove all space in the data 
        trim:true,
        minLength: 3
    },
},{
    timestamps:true,
});
// create the user model in mongoose and passing the schema  with the name schema which is User
const User = mongoose.model('User', userSchema);
// export the user to the server 
module.exports = User;