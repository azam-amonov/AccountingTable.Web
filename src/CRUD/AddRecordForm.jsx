// AddRecordForm.jsx
import React, {useEffect, useState } from 'react';
import uuid from "react-uuid";
import './Form.css'
import axios from "axios";

function AddRecordForm({ addRecord }) {
    const currentDate = new Date().toISOString().slice(0,16)
    const [type, setType] = useState('');
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(currentDate);
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        axios.get('https://localhost:5177/api/Category')
            .then((response) => {
                setCategories(response.data)
            })
    }, []);

    const handleCategoryChange = (e) => {
        const selectedCategoryName = e.target.value;
        const selectedCategory = categories.find(cat => cat.name === selectedCategoryName);
        if (selectedCategory) {
            setType(selectedCategory.accounting === 1 ? 'Expenses' : 'Income');
            setCategory(selectedCategoryName);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuid(); // Generate unique ID
        addRecord({ id, type, category, date, amount, comment });
        setType('');
        setCategory('');
        setDate(currentDate);
        setAmount('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} >
            <select
                value={category}
                onChange={handleCategoryChange}
                style={{fontSize: '23px', padding: '10px', width: '20%'}}
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
            <button 
                type="submit" 
                className={'create-button'}>
                Add Transaction
            </button>
        </form>
    );
}

export default AddRecordForm;
