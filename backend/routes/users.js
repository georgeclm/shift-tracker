// take the router
const router = require('express').Router();
// require the models for user.model
let User = require('../models/user.model');
// this is the first route for root url use get method this will 'user/' url will redirect to this route 
router.route('/').get((req, res)=>{
    // take all the user
    User.find()
        // set the result add json users format
        .then(users => res.json(users))
        // if there is error catch and bring back the error
        .catch(err=> res.status(400).json("Error: " + err))
});
// this is the post request for 'user/add' url 
router.route('/add').post((req, res) =>{
    // take the request input 
    const username = req.body.username;
    // create the object with the username
    const newUser = new User({username});
    // save to the database
    newUser.save()
        // and then return in json user add
        .then(()=>res.json('User added!'))
        // if there is error then pop this 
        .catch(err => res.status(400).json("Error: " +err));
});

module.exports = router;