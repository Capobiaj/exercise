import React from 'react';
import Exercise from './Exercise';


/**
 * Table for exercises. Will display the exercise parameters in the header, and then in the table body it will display each exercise recorded
 * in the database. Makes call down to Exercise in Exercise.js to map them to the table.
 */
function ExerciseTable({ exercises, onDelete, onEdit}) {
    return (
        <table id="beautiful-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Units</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i}/>)}
            </tbody>
        </table>
    )
}

export default ExerciseTable