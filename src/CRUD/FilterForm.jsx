import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import './Form.css';
import axios from "axios";

function FilterForm() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

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
        // Send selected categories to your API endpoint
        console.log("Selected Categories:", selectedCategories);
    };
    
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '300px',
            border: state.isFocused ? '1px solid #000' : '1px solid #ccc', 
            boxShadow: state.isFocused ? '0 0 3px rgba(0, 0, 0, 0.5)' : 'none', 
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#78b2cb', 
        }),
    };

    return (
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
