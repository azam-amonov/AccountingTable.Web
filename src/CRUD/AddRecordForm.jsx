// AddRecordForm.jsx
import React, {useEffect, useState } from 'react';
import uuid from "react-uuid";

function AddRecordForm({ addRecord }) {
    const currentDate = new Date().toISOString().slice(0,16)
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(currentDate);
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuid(); // Generate unique ID
        addRecord({ id, type, category, date, amount, comment });
        setType('');
        setCategory('');
        setDate(date);
        setAmount('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} >
            <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}>
                <option value= '0'> Income </option>
                <option value= '0'> Expenses </option>
            </select> &nbsp;
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            /> &nbsp;
            <input
                type="datetime-local"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            /> &nbsp;
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            /> &nbsp;
            <input
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            &nbsp; &nbsp;
            <button type="submit">Add Record</button>
        </form>
    );
}

export default AddRecordForm;
