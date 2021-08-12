import * as exercises from './exercise_model.mjs';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * Creates a new exercise with the name, reps, weight, units, and date
 * provided.
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.units, req.body.date)
    .then(exercise => {
        res.status(201).json(exercise)
    })
    .catch(error => {
        console.error(error)
        res.status(400).json({Error: 'Request failed'})
    });
});

/**
 * Retrive all exercises
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.status(200).json(exercises)
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'})
        });
});

/** 
 * Update the exercise whose id is provided in the paramters and
 * set its name, reps, weight, units, and date.
 */

app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.units, req.body.date)
        .then(nModified => {
            if (nModified === 1) {
                res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, units: req.body.units, date: req.body.date})
            } else {
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed - test'});
        });
});

/**
 * Delete the exercise whose id is provided in the query paramters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => {
            console.error(error);
            res.send({error: 'Request failed'});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
