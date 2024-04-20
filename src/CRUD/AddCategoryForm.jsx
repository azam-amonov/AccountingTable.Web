import React, { useState } from 'react';
import uuid from "react-uuid";
import './Form.css';
import axios from "axios";

function AddCategoryForm() {
    const [category, setCategory] = useState({
        id: uuid(),
        name: '',
        accounting: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuid();
        addCategory(id, name, accounting);
        setName('');
        setAccounting('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-category">
            <label htmlFor="categoryName"> Category Name: </label>
            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /> &nbsp;
            <select className="select-accounting"
                    value={accounting}
                    style={{fontSize: '23px', padding: '10px', width: '10%'}}
                    onChange={(e) => setAccounting(e.target.value)}
            >
                <option value="">Select Type</option>
                <option value='0'> Income</option>
                <option value='1'> Expenses</option>
            </select> &nbsp;
            <button type="submit" className="create-button">Create Category</button> &nbsp;
            <button type="button" className="edit-button">Edit Category</button> &nbsp;
            <button type="button" className="delete-button">Delete Category</button> 
        </form>
    );
}

export default AddCategoryForm;


