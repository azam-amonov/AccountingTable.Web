import React, { useState, useContext} from 'react';
import uuid from "react-uuid";
import '../shared/Form.css';
import {CategoryContext} from "../../context/CategoryContext";

function AddCategoryForm() {
    const {addCategory} = useContext(CategoryContext);
    const [category, setCategory] = useState({
        id: uuid(),
        name: '',
        accounting: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevState) => ({
            ...prevState,
            [name]: name === 'accounting' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = addCategory(category);
            console.log("Category created", response.data);
            setCategory({ 
                id: uuid(), 
                name: '', 
                accounting: '', });
        } catch (error) {
            console.error("Error creating", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="add-category">
            <label htmlFor="categoryName"> Category Name: </label>
            <input
                type="text"
                placeholder="Enter Name"
                value={category.name}
                onChange={(e) => handleChange(e)}
                name="name"
            /> &nbsp;
            <select
                typeof= 'number'
                className="select-accounting"
                value={category.accounting}
                style={{fontSize: '23px', padding: '10px', width: '10%'}}
                onChange={(e) => handleChange(e)}
                name="accounting"
            >
                <option value="">Select Type</option>
                <option value={parseInt('0')} >Income</option>
                <option value={parseInt('1')}>Expenses</option>
            </select> &nbsp;
            <button type="submit" className="create-button">Create Category</button> &nbsp;
        </form>
    );
}

export default AddCategoryForm;
