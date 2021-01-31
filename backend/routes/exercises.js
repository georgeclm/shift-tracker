// take the router
const router = require('express').Router();
// require the models for exercise.model
let Exercise = require('../models/exercise.model');
// this is the first route for root url use get method this will 'exercise/' url will redirect to this route 
router.route('/').get((req, res)=>{
    // take all the exercise
    Exercise.find()
        // set the result add json exercise format
        .then(exercises => res.json(exercises))
        // if there is error catch and bring back the error
        .catch(err=> res.status(400).json("Error: " + err))
});
// this is the post request for 'exercise/add' url 
router.route('/add').post((req, res) =>{
    // take the request input 
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    // create the object with the username
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });
    // save to the database
    newExercise.save()
        // and then return in json exercise add
        .then(()=>res.json('Exercise added!'))
        // if there is error then pop this 
        .catch(err => res.status(400).json("Error: " +err));
});
// this is to take the object id for the url
router.route('/:id').get((req,res)=>{
    // return the id by findbyid 
    Exercise.findById(req.params.id)
        // return the exercise as json or error
        .then(exercise =>res.json(exercise))
        .catch(err =>res.status(400).json("Error: "+ err));
});
// this is the same no with get request but with delete request
router.route('/:id').delete((req,res)=>{
    // find then delete
    Exercise.findByIdAndDelete(req.params.id)
        .then(() =>res.json('Exercise deleted'))
        .catch(err =>res.status(400).json("Error: "+ err));
});
// to update the value user update url
router.route('/update/:id').post((req,res)=>{
    // find the id
    Exercise.findById(req.params.id)
        // the then action
        .then(exercise =>{
            // change the username to the request username and all until date just like create new with the id that already exist
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
            // save with the new data
            exercise.save()
                .then(()=> res.json('Exercise Updated'))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err =>res.status(400).json("Error: "+ err));
});




module.exports = router;