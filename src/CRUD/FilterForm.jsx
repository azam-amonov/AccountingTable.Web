import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import categoriesData from '../data/categories.json';
import "react-datepicker/dist/react-datepicker.css";
import './Form.css'
function FilterForm({ filters }) {
    const [accounting, setAccounting] = useState('');
    const [categories, setCategories] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    
    useEffect(() => {
        setCategories(categoriesData);
    }, []);

    const handleSubmit = (e) => {}

    return (
        <form onSubmit={handleSubmit} className="add-category">
            <select className="select-accounting"
                    value={accounting}
                    style={{fontSize: '23px', padding: '10px', width: '10%'}}
                    onChange={(e) => setAccounting(e.target.value)}
            >
                <option value="">Select Type</option>
                <option value='0'> Income</option>
                <option value='1'> Expenses</option>
            </select> 
            &nbsp; &nbsp;
            <select className="select-category" style={{fontSize: '23px', padding: '10px'}}>
                <option value=''>Select Category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                ))}
            </select> &nbsp; &nbsp;
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
            <button type='button' className={'filter-button'}>Filer</button>
        </form>
    );
}

export default FilterForm;
