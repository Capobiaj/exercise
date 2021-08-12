import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

/**
 * Component for an exercise contains functionality for editing and deleting. Along with all of the exercise parameter properties.
 */
function Exercise({ exercise, onDelete, onEdit}) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.units}</td>
            <td>{exercise.date}</td>
            <td><MdEdit onClick={() => onEdit(exercise)}/></td>
            <td><MdDeleteForever onClick={() => onDelete(exercise._id)}/></td>
        </tr>
    );
}

export default Exercise