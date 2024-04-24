import React, { useState } from "react";
function EditTable({transaction, category,onUpdate }){
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
    }
    
    return(
        <tr key={transaction.id}>
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

export default EditTable;