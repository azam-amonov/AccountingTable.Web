import React, {useContext, useEffect, useState} from "react";
import { CategoryContext } from "../../context/CategoryContext";

function UpdateTransactionForm({transaction, category, onUpdate }){
    const { categories, fetchCategories } = useContext(CategoryContext);
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
    
    useEffect(() => {
        fetchCategories();
    }, []);
    
    return(
        <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{category.accounting === 0 ? 'Income' : 'Expenses'}</td>
            <td><select
                value={editedTransaction.categoryId}
                name={'categoryId'}
                onChange={handleChange}
                style={{fontSize: '23px', padding: '10px', width: '100%'}}>
                <option> Select Category </option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select></td>
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

export default UpdateTransactionForm;