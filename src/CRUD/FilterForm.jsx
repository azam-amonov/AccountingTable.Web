import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import categoriesData from '../data/categories.json';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import './Form.css';

function FilterForm({ filters }) {
    const [accounting, setAccounting] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        setCategories(categoriesData);
    }, []);

    const onSelectChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions.map(option => option.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send selected categories to your API endpoint
        console.log("Selected Categories:", selectedCategories);
    };
    
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '300px', // Adjust the width of the control
            border: state.isFocused ? '1px solid #000' : '1px solid #ccc', // Change border color when focused
            boxShadow: state.isFocused ? '0 0 3px rgba(0, 0, 0, 0.5)' : 'none', // Add box shadow when focused
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#f0f0f0', // Change background color of multi-value container
        }),
    };

    return (
        <form onSubmit={handleSubmit} className="add-category">
            <select
                className="select-accounting"
                value={accounting}
                onChange={(e) => setAccounting(e.target.value)}
                style={{fontSize: '23px', padding: '10px', width: '10%'}}
            >
                <option value="">Select Type</option>
                <option value='0'>Income</option>
                <option value='1'>Expenses</option>
            </select>
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
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
            />
            &nbsp; &nbsp;
            <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
            />
            &nbsp; &nbsp;
            <button type='button' className={'filter-button'}> Filter </button>
        </form>
    );
}

export default FilterForm;
