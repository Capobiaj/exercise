import mongoose from 'mongoose';
import { monitorEventLoopDelay } from 'perf_hooks';

mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose")
});

mongoose.set('useCreateIndex', true)

/**
 * Define the exercise schema
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    units: {type: String, required: true},
    date: {type: String, required: true}
});

/**
 * Compile the model from the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise
 * @param name 
 * @param reps 
 * @param weight 
 * @param units 
 * @param date 
 * @returns promise that resolves to a json object for the document
 */
const createExercise = async (name, reps, weight, units, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, units: units, date: date})
    return exercise.save();
}

/**
 * Retrieve exericses based on the filter, project and limit params
 * @param filter 
 * @param projection 
 * @param limit 
 * @returns 
 */
const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();
}

/**
 * Replace the name, reps, weight, units, and date properties of the
 * exercise with the id value provided.
 * @param _id 
 * @param name 
 * @param reps 
 * @param weight 
 * @param units 
 * @param date 
 * @returns promise that resolves to the number of docs modified
 */
const replaceExercise = async (_id, name, reps, weight, units, date) => {
    const result = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, units: units, date: date});
    return result.nModified;
}

/**
 * Deltes the exercise with the provided id value
 * @param _id 
 * @returns promise that resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}

export {deleteById, replaceExercise, findExercises, createExercise}