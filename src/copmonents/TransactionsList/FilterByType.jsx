import React, { useState, useContext } from 'react';
import {TransactionResultContext} from '../../context/TransactionResultContext';

function FilterByType(){
    const [accounting, setAccounting] = useState('');
    const {filterTransactionsByType} = useContext(TransactionResultContext);   
    const handleTypeChange = (e) => {
        setAccounting(e.target.value)
    }
  
    const onGetType = () => {
        if (!accounting){
            console.error('Please select a type')
            return;
        }
        
        filterTransactionsByType(accounting);
    };
    
    return (
        <div>
        <form action="">
            <select
                className="select-accounting"
                style={{fontSize: '23px', padding: '10px', width: '10%'}}
                value={accounting}
                onChange={handleTypeChange}
            >
                <option value="">Select Type</option>
                <option value='0'> Income</option>
                <option value='1'> Expenses</option>
            </select>
            &nbsp; &nbsp;
            <button type='button' onClick={onGetType}> Sort Type</button>
        </form>
        </div>
    )
}

export default FilterByType;