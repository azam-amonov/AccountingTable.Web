import React, { useState } from 'react';
import axios from "axios";
import Table from '../Tables/Table';

function FilterByType(){
    const [accounting, setAccounting] = useState('');
    const [typedTransaction, setTypedTransaction] = useState([]);
    
    const handleTypeChange = (e) => {
        setAccounting(e.target.value)
    }
    
    const onGetType = () => {
        if (!accounting){
            console.error('Please select a type')
            return;
        }
        
        axios.get(`https://localhost:5177/api/TransactionResult/type/${accounting}`)
            .then((response) =>{
                setTypedTransaction(response.data);
                console.log(typedTransaction);
            })
            .catch((error) => {
                console.error('Error fetching transaction: ', error);
            })
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
            <Table transactions={typedTransaction}></Table>
        </div>

    )
}

export default FilterByType;