import React, { useState, useEffect } from 'react';
import './Table.css'
import axios from "axios";
import {numberToCurrency} from "../service/parser";

function Table({}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:5177/api/TransactionResult')
            .then((response) =>{
                setData(response.data);
            })
    }, []);
    
    const onDelete = (id) => {
        axios.delete(`https://localhost:5177/api/Transaction/${id}`)
            .then(() => {
                getData()
            })
    }
    
    const getData = () => {
        axios.get('https://localhost:5177/api/TransactionResult')
            .then((getData) => {
                setData(getData.data)
            })
    }

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Comment</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {data.map(({ transaction, category }) => (
                <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{category.accounting === 0 ? 'Income': 'Expenses'}</td>
                    <td>{category.name}</td>
                    <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                    <td>{numberToCurrency(transaction.amount)}</td>
                    <td>{transaction.comment}</td>
                    <td>
                        <button onClick={() => onDelete(transaction.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;