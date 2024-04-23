import React, {useContext, useEffect, useState} from 'react';
import uuid from "react-uuid";
import '../shared/Form.css'
import axios from "axios";
import BASE_URL from "../../api/apiConfig";
import {CategoryContext} from "../../context/CategoryContext";

function AddTransactionsForm() {
    const currentDate = new Date().toISOString().slice(0, 16)
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(currentDate);
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const { categories, fetchCategories } = useContext(CategoryContext);

    useEffect(() => {
        fetchCategories()
    }, []);
    
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedCategory = categories.find(cat => cat.name === category);
            if (!selectedCategory) {
                console.error("Selected Category not found");
            }
            
            const newTransaction = {
                id: uuid(),
                userId: "47729a8b-e359-493e-a982-e7c818cd1220",
                categoryId: selectedCategory.id,
                transactionDate: new Date(date).toISOString(),
                comment: comment,
                amount: parseInt(amount)
            };
            
            const response =
                await axios.post(`${BASE_URL}/Transaction`, newTransaction);
            console.log("Category created", response.data);
            setCategory('');
            setDate(currentDate);
            setAmount('');
            setComment('');
        }catch (e) {
            console.error("Error catching",e);
        }
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
                value={parseInt(amount)}
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

export default AddTransactionsForm;
