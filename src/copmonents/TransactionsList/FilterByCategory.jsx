import React, { useEffect, useState, useContext } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import '../shared/Form.css';
import {TransactionsContext} from "../../Context/TransactionsContext";
import {CategoryContext} from "../../Context/CategoryContext";

function FilterByCategory() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const {filterTransactionsByCategories} = useContext(TransactionsContext);
    const {categories, fetchCategories} = useContext(CategoryContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    const onSelectChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions.map(option => option.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected Categories:", selectedCategories);
        const categoryNames = selectedCategories.map(category => `name=${category}`).join('&');
        filterTransactionsByCategories(categoryNames);
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
        </div>
    );
}

export default FilterByCategory;
