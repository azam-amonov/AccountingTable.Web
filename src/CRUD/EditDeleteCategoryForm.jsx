import React, { useEffect, useState } from 'react';
import './Form.css';
import axios from "axios";

function EditDeleteCategoryForm() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://localhost:5177/api/Category')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const onDelete = () => {
        const selectedCat = categories.find(cat => cat.name === selectedCategory);
        if (!selectedCat) {
            console.error('Selected category not found');
            return;
        }

        axios.delete(`https://localhost:5177/api/Category/${selectedCat.id}`)
            .then(() => {
                fetchData(); 
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
