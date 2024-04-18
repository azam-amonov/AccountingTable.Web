import React, {useState} from 'react';
import uuid from "react-uuid";

function AddCategoryForm({addCategory}){
    const [name, setName] = useState('')
    const [accounting, setAccounting] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuid();
        addCategory(id, name, accounting);
        setName('');
        setAccounting('');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="categoryName">Name: </label>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /> &nbsp;
            <select
                value={accounting}
                onChange={(e) => setAccounting(e.target.value)}>
                <option value="">Select Type</option>
                <option value='0'> Income</option>
                <option value='1'> Expenses</option>
            </select> &nbsp;
            <button> Create Category </button> &nbsp;
            <button> Delete Category </button> &nbsp;
            <button> Edit Category </button>
        </form>
    );
}

export default AddCategoryForm;