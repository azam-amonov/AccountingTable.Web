import React, {useContext, useEffect, useState} from 'react';
import '../../CRUD/Form.css';
import {CategoryContext} from "../../Context/CategoryContext";

function DeleteCategoryForm() {
    const {categories, fetchCategories, deleteCategoryById} = useContext(CategoryContext);
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
        deleteCategoryById(selectedCat.id)
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

export default DeleteCategoryForm;
