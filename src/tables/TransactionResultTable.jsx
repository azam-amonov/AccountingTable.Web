import React, {useContext, useState, useEffect} from 'react';
import { numberToCurrency } from "../service/parser";
import { TransactionResultContext } from "../context/TransactionResultContext";
import { TransactionContext } from "../context/TransactionContext";
import EditTable from "./EditTable";
import './Table.css'

function TransactionResultTable() {
    let displayTransactions;
    const [updateState, setUpdateState] = useState();
    const { transactionResults, filteredTransactionResults, fetchTransactionResult } = useContext(TransactionResultContext);
    const {transactions, setTransactions, updateTransaction, deleteTransactionById } = useContext(TransactionContext);
    
    const handleDelete = async (id) => { 
       await deleteTransactionById(id); 
       fetchTransactionResult(); 
    };
    
    function handleEdit(id) {
        setUpdateState(id)
        fetchTransactionResult();
    }
    
    const onUpdate =  async (transaction) => {
        await updateTransaction(transaction); 
        setUpdateState(null);
    };
    
    useEffect(() => {
        fetchTransactionResult();
    }, [ handleEdit, onUpdate ]);
    
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
                    updateState === transaction.id ?
                        <EditTable transaction = {transaction} 
                              transactions = {transactions} 
                              category = {category}
                              setTransactions = {setTransactions} 
                              onUpdate ={onUpdate} 
                        /> :
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{category.accounting === 0 ? 'Income' : 'Expenses'}</td>
                        <td>{category.name}</td>
                        <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                        <td>{numberToCurrency(transaction.amount)}</td>
                        <td>{transaction.comment}</td>
                        <td>
                            <button onClick={() => handleEdit(transaction.id)}>Edit</button>
                            &nbsp; | &nbsp;
                            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionResultTable;