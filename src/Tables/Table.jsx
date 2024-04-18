// Table.jsx
import React, { useState, useEffect } from 'react';
import './Table.css'
import transactionsResultData from '../data/transactionsResult.json';

function Table({ deleteRecord }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(transactionsResultData);
    }, []);

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
                    <td>{transaction.amount}</td>
                    <td>{transaction.comment}</td>
                    <td>
                        <button onClick={() => deleteRecord(transaction.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;