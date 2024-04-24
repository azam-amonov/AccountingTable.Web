import React, {useContext, useState} from 'react';
import { numberToCurrency } from "../service/parser";
import { TransactionResultContext } from "../context/TransactionResultContext";
import { TransactionContext } from "../context/TransactionContext";
import './Table.css'

function Table() {
    let displayTransactions;
    const {
        transactionResults,
        filteredTransactionResults,
        fetchTransactionResult
    } = useContext(TransactionResultContext);
    
    const {transactions, setTransactions, updateTransaction, deleteTransactionById} = useContext(TransactionContext);
    const [updateState, setUpdateState] = useState();
    
    const handleDelete = (id) => {
        deleteTransactionById(id);
        fetchTransactionResult();
    };
    
    if (filteredTransactionResults.length > 0) {
        displayTransactions = filteredTransactionResults;
    } else {
        displayTransactions = transactionResults;
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