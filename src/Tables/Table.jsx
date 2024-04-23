import React, {useContext, useState} from 'react';
import {TransactionsContext} from "../Context/TransactionsContext";
import axios from 'axios';
import './Table.css'
import { numberToCurrency } from "../service/parser";
import BASE_URL from "../configuration/apiConfig";

function Table() {
    const { transactions, filteredTransactions, fetchTransactions } = useContext(TransactionsContext);
    let displayTransactions;
    
    const onDelete = (id) => {
        axios.delete(`${BASE_URL}/Transaction/${id}`)
            .then(() => {
                fetchTransactions();
            })
            .catch((error) => {
                console.error('Error deleting transaction:', error);
            });
    };
    
    if (filteredTransactions.length > 0) {
        displayTransactions = filteredTransactions;
    }else {
        displayTransactions = transactions;
    }
  
    
    return (
        <div>
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
            {displayTransactions.map(({transaction, category}) => (
                <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{category.accounting === 0 ? 'Income' : 'Expenses'}</td>
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
        </div>
    );
}

export default Table;