import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


/**
 * Homepage in SPA react app. 
 * Homepage function loads all exercises in database using react effect hook. 
 * Deletes cause page to reload and display data after deletion from database.
 * Edits redirect user to /edit-exercise page in SPA.
 * Lastly, function returns the ExerciseTable and displays it. 
 */
function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE'});
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`); 
        }
    }


    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
            <Link to="/add-exercise">Add an exercise</Link>
        </> 
    )
};

    export default HomePage;