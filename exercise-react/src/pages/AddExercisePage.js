import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [units, setUnits] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, units, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <table class="beautiful-table">
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
                    <td>
                    <input
                        type="text"
                        placeholder="Enter name here"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        value={reps}
                        placeholder="Enter reps here"
                        onChange={e => setReps(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="number"
                        placeholder="Enter weight here"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="text"
                        placeholder="Enter units here"
                        value={units}
                        onChange={e => setUnits(e.target.value)} />
                    </td>
                    <td>
                    <input
                        type="text"
                        placeholder="Enter date here"
                        value={date}
                        onChange={e => setDate(e.target.value)} />
                    </td>
                    <button
                        onClick={addExercise}
                    >Add</button>
                </tbody>
            </table>
        </div>
    );
}

export default AddExercisePage;