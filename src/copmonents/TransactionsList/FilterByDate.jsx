import React, { useState, useContext } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../../CRUD/Form.css';
import DatePicker from 'react-datepicker';
import {TransactionsContext} from "../../Context/TransactionsContext";

function FilerByDate(){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const {filterTransactionsByDate} = useContext(TransactionsContext);
    
    const onGetDate = () => {
        filterTransactionsByDate(startDate, endDate)
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
        </div>
    )
}
export default FilerByDate;