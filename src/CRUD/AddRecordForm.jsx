// AddRecordForm.jsx
import React, { useState } from 'react';
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
        setDate('');
        setAmount('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            /> &nbsp;
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            /> &nbsp;
            <input
                type="date"
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
