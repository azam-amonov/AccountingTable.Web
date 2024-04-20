import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './Form.css';
import axios from "axios";

function FilterByType(){
    const [typedTransaction, setTypedTransaction] = useState([]);
    useEffect(() => {
        
    }, []);
    
    const onGetType = () => {
        axios.get(`https://localhost:5177/api/TransactionResutl/${accounting}`)
            .then(() =>{
            })
            
        }
    
    return (
        <form action="">
            <select
                className="select-accounting"
                style={{fontSize: '23px', padding: '10px', width: '10%'}}
            >
                <option value="">Select Type</option>
                <option value={parseInt('0')}> Income </option>
                <option value={parseInt('1')}> Expenses </option>
            </select> &nbsp; &nbsp;
            <button type='button'> Sort Type</button>
        </form>

    )
}

export default FilterByType;