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
    
    const onUpdate = (transaction) => {
        updateTransaction(transaction); 
    }

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
                        <Edit transaction = {transaction} 
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
    
    function handleUpdate(e){
        e.preventDefault();
    }
    function handleEdit(id) {
        setUpdateState(id)
    }

    function Edit({transaction, category, transactions, setTransactions, onUpdate}){
        const [editedTransaction, setEditedTransaction] = useState(transaction);
        
        function handleChange(e){
            setEditedTransaction({
                ...editedTransaction,
                [e.target.name] : e.target.value,
            })
        }

        function handleSubmit(e){
            e.preventDefault();
            onUpdate(editedTransaction)
            console.log(editedTransaction)
            setUpdateState(null);
        }
        return(
                <tr>
                    <td>{transaction.id}</td>
                    <td>{category.accounting === 0 ? 'Income' : 'Expenses'}</td>
                    <td>{category.name}</td>
                    <td>
                        <input type="date" 
                               name="transactionDate" 
                               onChange={handleChange} 
                               value={editedTransaction.transactionDate}/>
                    </td>
                    <td>
                        <input type="number"
                               name="amount"
                               placeholder="Amount"
                               onChange={handleChange} 
                               value={editedTransaction.amount}/></td>
                    <td>
                        <li>
                            <input type="text" 
                                   name="comment" 
                                   placeholder='Comment'
                                   onChange={handleChange} 
                                   value={editedTransaction.comment}/>
                        </li>
                    </td>
                    <td>
                        <button type="submit" onClick={handleSubmit}> Update </button>
                    </td>
                </tr>
        )
    }
    
    
    
};


export default Table;