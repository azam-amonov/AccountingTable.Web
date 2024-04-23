import React, {useContext, useEffect, useState} from 'react';
import './Form.css';
import axios from "axios";
import BASE_URL from "../configuration/apiConfig";
import {CategoryContext} from "../Context/CategoryContext";

function EditDeleteCategoryForm() {
    const {categories, fetchCategories} = useContext(CategoryContext);
    const [selectedCategory, setSelectedCategory] = useState('');
    

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const onDelete = () => {
        const selectedCat = categories.find(cat => cat.name === selectedCategory);
        if (!selectedCat) {
            console.error('Selected category not found');
            return;
        }

        axios.delete(`${BASE_URL}/Category/${selectedCat.id}`)
            .then(() => {
                fetchCategories(); 
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    };

    return (
        <form>
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{ fontSize: '23px', padding: '10px', width: '20%' }}
            >
                <option value=''> Select Category</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
            </select>
            &nbsp; &nbsp;
            <button onClick={onDelete}>Delete</button>
        </form>
    );
}

export default EditDeleteCategoryForm;
