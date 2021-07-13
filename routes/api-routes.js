const router = require('express').Router();
const { response } = require('express');
const Workout = require('../models/Workout.js');


//get all workouts, not required for hw. Helps get a sense for the data//werks
router.get("/api/allWorkouts", (request, response) => {
    Workout.find({})//find alllll
        .sort({ date: -1 })//sorting dates in descending order
        .then(dbWorkout => {//working with this returned data
            response.json(dbWorkout)
        }) 
})

//Creating a werkout//werks
router.post('/api/workouts', (req, response) => {
    Workout.create({})
    .then(workout => {
        response.json(workout);
    })
    .catch(err => {
        console.log('There is an error', err)
        response.json(err);
    });
});

//Getting the most recent workouts//werks
router.get('/api/workouts', (request, response) =>{
    Workout.find()
    .then(dbWorkout => {
        const updatedData = dbWorkout.map(workout=>{
            const totalDuration = workout.exercises.reduce((acc, curr) => acc+curr.duration, 0)        
        return {day: workout.day, exercises: workout.exercises, totalDuration, _id: workout._id}
        })
        console.log('Updated Data', updatedData);
            response.json(updatedData);
     })
     .catch(err => {
         res.json(err);
     })
 })

//updating a workout//werks
router.put('/api/workouts/:id', ({body, params}, response) => {
    console.log({body});
    Workout.findByIdAndUpdate(
        params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true}
    )
    .then(dbWorkout => {
        response.json(dbWorkout)
    })
    .catch(err => {
        response.json(err);
    });
});



//Where we get the last 7 workouts
router.get('/api/workouts/range', (request, response) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .sort({ _id: 1 })//sorting in ascending order
    .limit(7)
    .then(dbWorkout => {
        console.log("The last 7 workouts", dbWorkout);
        response.json(dbWorkout);
    })
    .catch(err => {
        response.json(err);
    });
});


// Where we delete a workout
router.delete('/api/workouts/delete', ({body}, response) => {
    Workout.findByIdAndRemove(body.id)
    .then (() => {
        response.json(true)
    })
    .catch(err => {
        response.json(err);
    });
});




















module.exports = router;//NEED this!