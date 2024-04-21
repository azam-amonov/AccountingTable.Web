import React, { useState } from 'react';
import axios from "axios";
import Table from '../Tables/Table';
import "react-datepicker/dist/react-datepicker.css";
import './Form.css';
import DatePicker from 'react-datepicker';
import BASE_URL from "../configuration/apiConfig";

function FilerByDate(){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState('');
    const [filteredTransaction, setFilteredTransaction] = useState([]);
    
    const onGetDate = () => {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        console.log('formatted:   ',formattedStartDate);
        axios.get(`${BASE_URL}/TransactionResult/between/date?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
            .then(response => {
                setFilteredTransaction(response.data);
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