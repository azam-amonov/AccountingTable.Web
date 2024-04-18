// AddRecordForm.jsx
import React, {useEffect, useState } from 'react';
import uuid from "react-uuid";
import categoriesData from '../data/categories.json';

function AddRecordForm({ addRecord }) {
    const currentDate = new Date().toISOString().slice(0,16)
    const [type, setType] = useState('');
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(currentDate);
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        setCategories(categoriesData); // Set categories data from imported JSON
    }, []);
    
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value=''> Select Category</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
            </select> &nbsp;
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
