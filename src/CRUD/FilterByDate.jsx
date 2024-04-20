import React, { useState } from 'react';
import axios from "axios";
import Table from '../Tables/Table';
import "react-datepicker/dist/react-datepicker.css";
import './Form.css';
import DatePicker from 'react-datepicker';

function FilerByDate(){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState('');
    const [filteredTransaction, setFilteredTransaction] = useState([]);
    
    const onGetDate = () => {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        console.log('formatted:   ',formattedStartDate);
        axios.get(`https://localhost:5177/api/TransactionResult/between/date?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
            .then(response => {
                setFilteredTransaction(response.data);
                console.log(filteredTransaction);
            })
            .catch((error) => {
                console.error('Error getting transaction', error);
            })
    };
    
    return (
        <div>
            <form action={''}>
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
                <button type={'button'} onClick={onGetDate}> Get by date </button>
            </form>
            <Table transactions={filteredTransaction}></Table>
        </div>
    )
}
export default FilerByDate;