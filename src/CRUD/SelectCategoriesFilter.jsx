import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import './Form.css';
import axios from "axios";
import Table from "../Tables/Table";

function SelectCategoriesFilter() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:5177/api/Category')
            .then((response) => {
                setCategories(response.data);
            })
    }, []);

    const onSelectChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions.map(option => option.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected Categories:", selectedCategories);
        const categoryNames = selectedCategories.map(category => `name=${category}`).join('&');
        axios.get(`https://localhost:5177/api/TransactionResult/names?${categoryNames}`)
            .then(response => {
                setFilteredTransactions(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    };
    
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '1000px',
            border: state.isFocused ? '1px solid #000' : '1px solid #ccc', 
            boxShadow: state.isFocused ? '0 0 3px rgba(0, 0, 0, 0.5)' : 'none', 
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#78b2cb', 
        }),
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className="add-category">
            &nbsp; &nbsp;
            <Select
                defaultValue={[]}
                isMulti
                name='categories'
                closeMenuOnSelect={false}
                options={categories.map(category => ({value: category.name, label: category.name}))}
                className="select-categories"
                classNamePrefix="select"
                onChange={onSelectChange}
                styles={customStyles} 
            />
            &nbsp; &nbsp;
            <button type='submit' className={'filter-button'} > Filter </button>
        </form>
            <Table transactions={filteredTransactions}></Table>
        </div>
    );
}

export default SelectCategoriesFilter;
